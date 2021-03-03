import {
    ActivatedRoute,
    Router,
} from '@angular/router';
import {
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';

import {
    map,
    switchMap,
    takeUntil,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { AskForOfferService } from 'src/common/graphql/services/ask-for-offer.service';
import { IFieldError } from 'src/common/containers/form/models/form-definition.model';
import { ISupplyPointImportInput } from 'src/common/graphql/models/supply-point-import.model';
import { ISupplyPoint } from 'src/common/graphql/models/supply.model';
import { formFields } from 'src/common/containers/form/forms/prices/prices-form.config';
import { parseGraphQLErrors } from 'src/common/utils';
import { SupplyPointImportService } from 'src/common/graphql/services/supply-point-import.service';

@Component({
    selector: 'pxe-create-user-prices',
    templateUrl: './prices.component.html',
    styleUrls: ['./prices.component.scss'],
})
export class PricesComponent extends AbstractComponent implements OnInit {
    public formFields = formFields;
    public formLoading = false;
    public formSent = false;
    public globalError: string[] = [];
    public fieldError: IFieldError = {};
    public askForOfferId = this.route.snapshot.queryParams.askForOfferId;
    public supplyPoint: ISupplyPoint;

    constructor(
        public askForOfferService: AskForOfferService,
        private cd: ChangeDetectorRef,
        private route: ActivatedRoute,
        private router: Router,
        private supplyPointImportService: SupplyPointImportService,
    ) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        this.supplyPointImportService.
            findSupplyPointImport(this.askForOfferId)
                .pipe(
                    takeUntil(this.destroy$),
                    map(({data}) => data.findSupplyPointImport),
                )
                .subscribe( (supplyPoint: ISupplyPoint) => {
                    this.supplyPoint = supplyPoint;
                    this.cd.markForCheck();
                });
    }

    public save = (data) => {
        const supplyPoint: ISupplyPointImportInput = this.supplyPointImportService.mapSupplyPointToSupplyPointInput(this.supplyPoint);

        this.supplyPointImportService.createSupplyPointImport(
                this.askForOfferId,
                supplyPoint,
            ).pipe(
                takeUntil(this.destroy$),
            ).subscribe( _ => {
                this.router.navigate([this.ROUTES.ROUTER_ASK_FOR_OFFER_PROCESSED]);
            },
            (error) => {
                this.formLoading = false;
                const { fieldError, globalError } = parseGraphQLErrors(error);
                this.fieldError = fieldError;
                this.globalError = globalError;
                this.cd.markForCheck();
            });
    }

    public saveAndSend = (data) => {
        const supplyPoint: ISupplyPointImportInput = this.supplyPointImportService.mapSupplyPointToSupplyPointInput(this.supplyPoint);

        this.supplyPointImportService.createSupplyPointImport(
                this.askForOfferId,
                supplyPoint,
            )
            .pipe(
                switchMap((_) => {
                    return this.askForOfferService.finalizeAskForOffer(this.askForOfferId);
                }),
                takeUntil(this.destroy$),
            ).subscribe(_ => {
                this.router.navigate([this.ROUTES.ROUTER_ASK_FOR_OFFER_PROCESSED]);
                },
            (error) => {
                this.formLoading = false;
                const { fieldError, globalError } = parseGraphQLErrors(error);
                this.fieldError = fieldError;
                this.globalError = globalError;
                this.cd.markForCheck();
            });
    }

    public submit = (prices) => {
        let supplyPointImport = this.supplyPointImportService.mapSupplyPointToSupplyPointInput(this.supplyPoint);
        supplyPointImport.importPricePerKwGas = parseFloat(prices.importPricePerKwGas);
        supplyPointImport.importPricePerKwPowerNT = parseFloat(prices.importPricePerKwPowerNT);
        supplyPointImport.importPricePerKwPowerVT = parseFloat(prices.importPricePerKwPowerVT);
        supplyPointImport.importPriceTotalPerYear = parseFloat(prices.importPriceTotalPerYear);
        const omitTypename = (key, value) => (key === '__typename' ? undefined : value);
        supplyPointImport = JSON.parse(JSON.stringify(supplyPointImport), omitTypename);
        this.supplyPointImportService.createSupplyPointImport(this.askForOfferId,  supplyPointImport).subscribe();
    }

    public backStep = () => this.router.navigate([this.ROUTES.ROUTER_CREATE_USER_RECAPITULATION], {
        queryParams: {
            askForOfferId: this.askForOfferId,
        },
    })
}
