import {
    ActivatedRoute,
    Router,
} from '@angular/router';
import {
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';

import * as R from 'ramda';
import {
    map,
    takeUntil,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { AuthService } from 'src/app/services/auth.service';
import { CommodityType } from 'src/common/graphql/models/supply.model';
import { formFields } from 'src/common/containers/form/forms/supply-offer/supply-offer-form.config';
import { IFieldError } from 'src/common/containers/form/models/form-definition.model';
import {
    IOfferInput,
    IOfferInputGasAttributes,
    IOfferInputPowerAttributes,
} from 'src/common/graphql/models/offer.model';
import { OfferService } from 'src/common/graphql/services/offer.service';
import { parseGraphQLErrors } from 'src/common/utils';
import { ROUTES } from 'src/app/app.constants';
import { SupplyOfferConfig } from './supply-offer.config';

@Component({
    selector: 'pxe-supply-offer',
    templateUrl: './supply-offer.component.html',
    styleUrls: [
        './supply-offer.component.scss',
    ],
})
export class SupplyOfferComponent extends AbstractComponent implements OnInit {
    public commodityType = CommodityType.POWER;
    public routePower = ROUTES.ROUTER_SUPPLY_OFFER_POWER;
    public routeGas = ROUTES.ROUTER_SUPPLY_OFFER_GAS;
    public formFields = formFields;
    public formSent = false;
    public globalError: string[] = [];
    public fieldError: IFieldError = {};
    public formLoading = false;
    public tableRows = [];
    public loadingOffers = true;

    constructor(
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private offerService: OfferService,
        private route: ActivatedRoute,
        private router: Router,
        public supplyOfferConfig: SupplyOfferConfig,
    ) {
        super();
    }

    ngOnInit() {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.route.params
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(params => {
                console.log('%c ***** params *****', 'background: #bada55; color: #000; font-weight: bold',
                    params, Object.values(CommodityType));
                if (params.commodityType !== 'power' && params.commodityType !== 'gas') {
                    this.router.navigate([this.routePower]);
                    return;
                }
                this.commodityType = params.commodityType === 'power' ? CommodityType.POWER : CommodityType.GAS;
                this.loadOffers();
            });
    }

    public edit = (table, row) => {
        if (table.openedRow !== row) {
            table.openRow(row);
            table.selectRow(row);
        }
    }

    public create = (table, row) => {
        if (table.openedRow !== row) {
            table.openRow(row);
            table.selectRow(row);
        }
    }

    public duplicate = (table, row) => {
        if (table.openedRow !== row) {
            table.openRow(row);
            table.selectRow(row);
        }
    }

    public delete = (table, row) => {
        if (table.openedRow !== row) {
            table.openRow(row);
            table.selectRow(row);
        }
    }

    public loadOffers = () => {
        this.offerService.findSupplierOffers()
            .pipe(
                takeUntil(this.destroy$),
                map(({data}) => R.filter(R.propEq('commodityType', this.commodityType))(data.findSupplierOffers)),
            )
            .subscribe(
                rows => {
                    console.log('%c ***** loadOffers *****', 'background: #bada55; color: #000; font-weight: bold', rows);
                    this.tableRows = rows;
                    this.loadingOffers = false;
                    this.cd.markForCheck();
                }, error => {
                    // TODO errors are temporary disabled for this query
                });
    }

    public submitForm = (supplyOfferFormData: any, table = null, row = null) => {
        console.log('%c ***** submitSupplyForm *****', 'background: #bada55; color: #000; font-weight: bold',
            supplyOfferFormData, JSON.stringify(supplyOfferFormData), this.authService.currentUserValue.subjectId);
        this.formLoading = true;
        this.globalError = [];
        this.fieldError = {};
        let offerPointAction;

        const offer: IOfferInput = R.pick([
            'name',
            'validFrom',
            'validTo',
            'deliveryFrom',
            'deliveryTo',
            'deliveryLength',
            'distributionLocation',
            'permanentPaymentPrice',
            'subjectTypeId',
            'benefits',
        ], supplyOfferFormData);

        offer.supplierId = this.authService.currentUserValue.subjectId;

        if (supplyOfferFormData.commodityType === CommodityType.POWER) {
            const powerAttributes: IOfferInputPowerAttributes =
                R.pick([
                    'priceVT',
                    'priceNT',
                    'distributionRateId',
                    'circuitBreakerId',
                ], supplyOfferFormData);
            offerPointAction = this.offerService.savePowerOffer(offer, powerAttributes);
        } else {
            const gasAttributes: IOfferInputGasAttributes =
                R.pick([
                    'priceGas',
                    'annualConsumptionId',
                ], supplyOfferFormData);
            offerPointAction = this.offerService.saveGasOffer(offer, gasAttributes);
        }

        offerPointAction
            .subscribe(
                (data) => {
                    this.formLoading = false;
                    this.formSent = true;
                    this.cd.markForCheck();

                    if (table && row) {
                        this.toggleRow(table, row);
                    }
                },
                (error) => {
                    this.formLoading = false;
                    const { fieldError, globalError } = parseGraphQLErrors(error);
                    this.fieldError = fieldError;
                    this.globalError = globalError;
                    this.cd.markForCheck();
                });
    }

    public cancel = (event, table = null, row = null) => {
        if (table && row) {
            this.toggleRow(table, row);
        }
    }

    public toggleRow = (table, row) => {
        table.openRow(row);
    }
}
