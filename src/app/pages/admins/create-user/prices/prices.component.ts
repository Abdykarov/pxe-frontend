import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { CODE_LIST_TYPES } from 'src/app/app.constants';
import { CreateUserFacade } from 'src/app/pages/admins/create-user/create-user.facade';
import { AbstractComponent } from 'src/common/abstract.component';
import { formFields } from 'src/common/containers/form/forms/prices/prices-form.config';
import { IFieldError } from 'src/common/containers/form/models/form-definition.model';
import { ISupplyPointImportInput } from 'src/common/graphql/models/supply-point-import.model';
import {
    ICodelistOptions,
    ISupplyPoint,
} from 'src/common/graphql/models/supply.model';
import { AskForOfferService } from 'src/common/graphql/services/ask-for-offer.service';
import { SupplyPointImportService } from 'src/common/graphql/services/supply-point-import.service';
import { SupplyService } from 'src/common/graphql/services/supply.service';
import { parseGraphQLErrors, transformCodeList } from 'src/common/utils';

@Component({
    selector: 'pxe-create-user-prices',
    templateUrl: './prices.component.html',
    styleUrls: ['./prices.component.scss'],
})
export class PricesComponent extends AbstractComponent implements OnInit {
    public supplyPoint$ = this.createUserFacade.activeSupplyPoint$;

    public formFields = formFields;
    public formLoading = false;
    public formSent = false;
    public globalError: string[] = [];
    public fieldError: IFieldError = {};

    constructor(
        public askForOfferService: AskForOfferService,
        private cd: ChangeDetectorRef,
        private createUserFacade: CreateUserFacade,
        private route: ActivatedRoute,
        private router: Router,
        private supplyPointImportService: SupplyPointImportService,
        private supplyService: SupplyService
    ) {
        super();
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    }

    public codeLists$: Observable<ICodelistOptions> = this.supplyService
        .findCodelistsByTypes(CODE_LIST_TYPES, 'cs')
        .pipe(
            takeUntil(this.destroy$),
            map(({ data }) => transformCodeList(data.findCodelistsByTypes))
        );

    // Care for testing
    // Admin fill prices without tax
    // Consumer see it with tax
    public save = (formData, activeSupplyPoint: ISupplyPoint) => {
        const data = formData.value;
        const isOnlySave = formData.data;
        const supplyPoint: ISupplyPointImportInput =
            this.supplyPointImportService.mapSupplyPointToSupplyPointInput(
                activeSupplyPoint
            );
        (supplyPoint.importPermanentMonthlyPay =
            data?.importPermanentMonthlyPay),
            (supplyPoint.importPriceTotalPerYear =
                data?.importPriceTotalPerYear),
            (supplyPoint.importPricePerKwPowerVT =
                data?.importPricePerKwPowerVT),
            (supplyPoint.importPricePerKwPowerNT =
                data?.importPricePerKwPowerNT),
            (supplyPoint.importPricePerKwGas = data?.importPricePerKwGas),
            this.supplyPointImportService
                .createSupplyPointImport(
                    this.createUserFacade.getAskForOfferId(),
                    supplyPoint
                )
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                    (_) => {
                        if (!isOnlySave) {
                            this.router.navigate(
                                [this.ROUTES.ROUTER_CREATE_USER_SUPPLY_POINT],
                                {
                                    queryParams: {
                                        askForOfferId:
                                            this.createUserFacade.getAskForOfferId(),
                                        email: this.createUserFacade.getEmail(),
                                    },
                                    state: {
                                        isNewSupplyPoint: true,
                                    },
                                }
                            );
                        } else {
                            this.router
                                .navigate([
                                    this.ROUTES
                                        .ROUTER_ASK_FOR_OFFER_IN_PROGRESS,
                                ])
                                .then((__) => {
                                    this.createUserFacade.showInfoAboutSupplyPointAdded();
                                });
                        }
                    },
                    (error) => {
                        this.formLoading = false;
                        const { fieldError, globalError } =
                            parseGraphQLErrors(error);
                        this.fieldError = fieldError;
                        this.globalError =
                            this.createUserFacade.processEanFieldErrorToGlobal(
                                fieldError
                            ) || globalError;
                        this.cd.markForCheck();
                    }
                );
    };

    public saveAndSend = (data, activeSupplyPoint: ISupplyPoint) => {
        const supplyPoint: ISupplyPointImportInput =
            this.supplyPointImportService.mapSupplyPointToSupplyPointInput(
                activeSupplyPoint
            );
        this.supplyPointImportService.mapPricesToSupplyPointImport(
            supplyPoint,
            data
        );

        this.supplyPointImportService
            .createSupplyPointImport(
                this.createUserFacade.getAskForOfferId(),
                supplyPoint
            )
            .pipe(
                switchMap((_) => {
                    return this.askForOfferService.finalizeAskForOffer(
                        this.createUserFacade.getAskForOfferId()
                    );
                }),
                takeUntil(this.destroy$)
            )
            .subscribe(
                (_) => {
                    this.router.navigate([
                        this.ROUTES.ROUTER_ASK_FOR_OFFER_PROCESSED,
                    ]);
                },
                (error) => {
                    this.formLoading = false;
                    const { fieldError, globalError } =
                        parseGraphQLErrors(error);
                    this.fieldError = fieldError;
                    this.globalError =
                        this.createUserFacade.processEanFieldErrorToGlobal(
                            fieldError
                        ) || globalError;
                    this.cd.markForCheck();
                }
            );
    };

    public backStep = () =>
        this.router.navigate([this.ROUTES.ROUTER_CREATE_USER_RECAPITULATION], {
            queryParams: this.createUserFacade.queryParamsSubject$.getValue(),
        });
}
