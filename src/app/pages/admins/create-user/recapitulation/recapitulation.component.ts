import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as R from 'ramda';
import { Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { CODE_LIST_TYPES, CONSTS } from 'src/app/app.constants';
import { CreateUserFacade } from 'src/app/pages/admins/create-user/create-user.facade';
import { AbstractComponent } from 'src/common/abstract.component';
import { formFields } from 'src/common/containers/form/forms/personal-info/personal-info-form.config';
import { IFieldError } from 'src/common/containers/form/models/form-definition.model';
import { IPersonalDataInput } from 'src/common/graphql/models/personal-data.model';
import { ISupplyPointImportInput } from 'src/common/graphql/models/supply-point-import.model';
import {
    ICodelistOptions,
    ISupplyPoint,
    SubjectType,
} from 'src/common/graphql/models/supply.model';
import { AskForOfferService } from 'src/common/graphql/services/ask-for-offer.service';
import { SupplyPointImportService } from 'src/common/graphql/services/supply-point-import.service';
import { SupplyService } from 'src/common/graphql/services/supply.service';
import {
    parseGraphQLErrors,
    removeRequiredValidators,
    transformCodeList,
} from 'src/common/utils';

@Component({
    selector: 'pxe-create-user-prices',
    templateUrl: './recapitulation.component.html',
    styleUrls: ['./recapitulation.component.scss'],
})
export class RecapitulationComponent
    extends AbstractComponent
    implements OnInit
{
    public fieldError: IFieldError = {};
    public formLoading = false;
    public formSent = false;
    public globalError: string[] = [];
    public codeLists = null;
    public formFields = { ...formFields };

    public subjectType = SubjectType;
    public supplyPoint$: Observable<ISupplyPoint> = null;
    public codeLists$: Observable<ICodelistOptions> = this.supplyService
        .findCodelistsByTypes(CODE_LIST_TYPES, 'cs')
        .pipe(
            takeUntil(this.destroy$),
            map(({ data }) => transformCodeList(data.findCodelistsByTypes))
        );

    constructor(
        private askForOfferService: AskForOfferService,
        private cd: ChangeDetectorRef,
        private createUserFacade: CreateUserFacade,
        private route: ActivatedRoute,
        private router: Router,
        private supplyService: SupplyService,
        private supplyPointImportService: SupplyPointImportService
    ) {
        super();
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.formFields.controls = removeRequiredValidators(
            this.formFields.controls
        );

        const isEmailFromManuallyAddAskForOffer =
            this.createUserFacade.getEmail() ===
            CONSTS.ASK_FOR_OFFER.MANUALLY_ADD_EMAIL;
        if (isEmailFromManuallyAddAskForOffer) {
            const oldValidators = this.formFields.controls['email'][1];
            this.formFields.controls['email'][1] = [
                ...this.formFields.controls['email'][1],
                Validators.required,
                (formControl: FormControl) => {
                    const result = Validators.pattern(
                        `^(?!${CONSTS.ASK_FOR_OFFER.MANUALLY_ADD_EMAIL}).*$`
                    )(formControl);
                    return R.isNil(result) ? result : { needChangeEmail: true };
                },
            ];
        }

        this.supplyPoint$ = this.createUserFacade.activeSupplyPoint$.pipe(
            map((supplyPoint: ISupplyPoint) => {
                if (
                    supplyPoint?.contract &&
                    !supplyPoint.contract?.personalData?.email
                ) {
                    supplyPoint.contract.personalData = {
                        email: this.createUserFacade.queryParamsSubject$.getValue()
                            .email,
                        ...supplyPoint?.contract?.personalData,
                    };
                }

                return supplyPoint;
            })
        );
    }

    ngOnInit() {
        super.ngOnInit();
        this.codeLists$.pipe(takeUntil(this.destroy$)).subscribe(
            (codeLists) => {
                this.codeLists = codeLists;
                this.cd.markForCheck();
            },
            (error) => {
                const { fieldError, globalError } = parseGraphQLErrors(error);
                this.fieldError = fieldError;
                this.globalError = globalError;
                this.cd.markForCheck();
            }
        );
    }

    public submit = (
        personalData: IPersonalDataInput,
        activeSupplyPoint: ISupplyPoint
    ) => {
        const supplyPoint: ISupplyPointImportInput =
            this.supplyPointImportService.mapSupplyPointToSupplyPointInput(
                activeSupplyPoint
            );
        supplyPoint.personalData = personalData;
        this.supplyPointImportService.mapPricesToSupplyPointImport(
            supplyPoint,
            activeSupplyPoint
        );
        delete supplyPoint?.address['__typename'];

        this.supplyPointImportService
            .createSupplyPointImport(
                this.createUserFacade.getAskForOfferId(),
                supplyPoint
            )
            .pipe(
                takeUntil(this.destroy$),
                map(({ data }) => data.createSupplyPointImport)
            )
            .subscribe(
                (newSupplyPoint) => {
                    this.createUserFacade.setActiveSupplyPoint(newSupplyPoint);
                    this.router.navigate(
                        [this.ROUTES.ROUTER_CREATE_USER_PRICES],
                        {
                            queryParams:
                                this.createUserFacade.queryParamsSubject$.getValue(),
                        }
                    );
                },
                (error) => {
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
        this.router.navigate([this.ROUTES.ROUTER_CREATE_USER_SUPPLY_POINT], {
            queryParams: this.createUserFacade.queryParamsSubject$.getValue(),
        });
}
