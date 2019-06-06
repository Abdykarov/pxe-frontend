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
import * as R_ from 'ramda-extension';
import {
    BehaviorSubject,
    combineLatest,
    Observable,
} from 'rxjs';
import {
    map,
    takeUntil,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { AuthService } from 'src/app/services/auth.service';
import {
    CODE_LIST_TYPES,
    ROUTES,
} from 'src/app/app.constants';
import { CommodityType } from 'src/common/graphql/models/supply.model';
import { formFields } from 'src/common/containers/form/forms/supply-offer/supply-offer-form.config';
import { IFieldError } from 'src/common/containers/form/models/form-definition.model';
import {
    IOffer,
    IOfferInput,
    IOfferInputGasAttributes,
    IOfferInputPowerAttributes, IOfferStatus,
} from 'src/common/graphql/models/offer.model';
import { ITableColumnConfig } from 'src/common/ui/table/models/table.model';
import { OfferService } from 'src/common/graphql/services/offer.service';
import {
    parseGraphQLErrors,
    transformCodeList,
} from 'src/common/utils';
import { SupplyOfferConfig } from './supply-offer.config';
import { SupplyService } from 'src/common/graphql/services/supply.service';

@Component({
    selector: 'pxe-supply-offer',
    templateUrl: './supply-offer.component.html',
    styleUrls: [
        './supply-offer.component.scss',
    ],
})
export class SupplyOfferComponent extends AbstractComponent implements OnInit {
    public commodityType = CommodityType.POWER;
    public fieldError: IFieldError = {};
    public formFields = formFields;
    public formLoading = false;
    public formSent = false;
    public formValues = <IOffer>{};
    public globalError: string[] = [];
    public globalFormError: string[] = [];
    public loadingOffers = true;
    public tableRows: IOffer[] = [];
    public tableCols: ITableColumnConfig[] = [];
    public routePower = ROUTES.ROUTER_SUPPLY_OFFER_POWER;
    public routeGas = ROUTES.ROUTER_SUPPLY_OFFER_GAS;
    public deleteDisabled: boolean[] = [];

    private commodityType$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    private codeLists$: Observable<any> = this.supplyService.findCodelistsByTypes(CODE_LIST_TYPES, 'cs')
        .pipe(
            map(({data}) => transformCodeList(data.findCodelistsByTypes)),
        );
    private offers$: Observable<IOffer[]> = this.offerService.findSupplierOffers()
        .pipe(
            map(({data}) => R.filter(
                R.whereEq({
                    commodityType: this.commodityType,
                    status: IOfferStatus.ACTIVE},
                ),
            )(data.findSupplierOffers)),
        );

    constructor(
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private offerService: OfferService,
        private route: ActivatedRoute,
        private router: Router,
        public supplyOfferConfig: SupplyOfferConfig,
        private supplyService: SupplyService,
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
                const supplyOfferCommodityTypes = this.supplyOfferConfig.supplyOfferCommodityTypes;
                if (R.indexOf(params.commodityType, R.keys(supplyOfferCommodityTypes)) < 0) {
                    this.router.navigate([this.routePower]);
                    return;
                }
                this.commodityType = supplyOfferCommodityTypes[params.commodityType];
                this.commodityType$.next(this.commodityType);
            });

        combineLatest(this.codeLists$, this.offers$, this.commodityType$)
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(
                ([codeLists, offers, commodityType]) => {
                    if (codeLists && offers) {
                        this.tableRows = offers;
                        this.tableCols = this.supplyOfferConfig.tableCols(codeLists)[commodityType];
                        this.loadingOffers = false;
                        this.deleteDisabled = [];
                        this.cd.markForCheck();
                    }
                },
                error => {
                    this.deleteDisabled = [];
                    const { globalError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.cd.markForCheck();
                });
    }

    public edit = (table, row) => {
        this.globalFormError = [];
        this.formValues = {
            ...row,
        };
        if (table.openedRow !== row) {
            this.toggleRow(table, row);
        }
    }

    public create = (table, row) => {
        this.globalFormError = [];
        this.formValues = <IOffer>{};
        if (table.openedRow !== row) {
            this.toggleRow(table, row);
        }
    }

    public duplicate = (table, row) => {
        this.globalFormError = [];
        this.formValues = {
            ...row,
            id: null,
        };
        if (table.openedRow !== row) {
            this.toggleRow(table, row);
        }
    }

    public delete = (table, row, id = undefined) => {
        this.globalFormError = [];
        if (R_.isNilOrEmptyString(id)) {
            this.toggleRow(table, row);
        } else {
            this.deleteDisabled[id] = true;
            this.offerService.deleteOffer(row.id)
                .pipe(
                    takeUntil(this.destroy$),
                )
                .subscribe(
                    () => {
                        this.deleteDisabled = [];
                    },
                    (error) => {
                        this.deleteDisabled = [];
                        const { globalError } = parseGraphQLErrors(error);
                        this.globalFormError = globalError;
                        this.cd.markForCheck();
                    },
                );
        }
    }

    public submitForm = (supplyOfferFormData: any, table = null, row = null) => {
        this.formLoading = true;
        this.globalFormError = [];
        this.fieldError = {};
        let offerPointAction;
        const isCreateAction = R.isNil(supplyOfferFormData.id);
        const id = parseInt(supplyOfferFormData.id, 10);

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
            offerPointAction = isCreateAction ? this.offerService.savePowerOffer(offer, powerAttributes) :
                this.offerService.updatePowerOffer(id, offer, powerAttributes);
        } else {
            const gasAttributes: IOfferInputGasAttributes =
                R.pick([
                    'priceGas',
                    'annualConsumptionId',
                ], supplyOfferFormData);
            offerPointAction = isCreateAction ? this.offerService.saveGasOffer(offer, gasAttributes) :
                this.offerService.updateGasOffer(id, offer, gasAttributes);
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
                    this.globalFormError = globalError;
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
        table.selectRow(row);
    }
}
