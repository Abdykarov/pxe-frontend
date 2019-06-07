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
    filter,
    map,
    takeUntil,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { AuthService } from 'src/app/services/auth.service';
import { CommodityType } from 'src/common/graphql/models/supply.model';
import { formFields } from 'src/common/containers/form/forms/supply-offer/supply-offer-form.config';
import { ICloseModalData } from 'src/common/containers/modal/modals/model/modal.model';
import { IFieldError } from 'src/common/containers/form/models/form-definition.model';
import {
    IOffer,
    IOfferInput,
    IOfferInputGasAttributes,
    IOfferInputPowerAttributes, IOfferStatus,
} from 'src/common/graphql/models/offer.model';
import { ModalService } from 'src/common/containers/modal/modal.service';
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
    public currentOfferFormValues = {};
    public deleteDisabled: boolean[] = [];
    public fieldError: IFieldError = {};
    public formFields = formFields;
    public formLoading = false;
    public formSent = false;
    public formValues = <IOffer>{};
    public globalError: string[] = [];
    public loadingOffers = true;
    public tableRows = [];
    public routePower = ROUTES.ROUTER_SUPPLY_OFFER_POWER;
    public routeGas = ROUTES.ROUTER_SUPPLY_OFFER_GAS;

    constructor(
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private modalsService: ModalService,
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
                const supplyOfferCommodityTypes = this.supplyOfferConfig.supplyOfferCommodityTypes;
                if (R.indexOf(params.commodityType, R.keys(supplyOfferCommodityTypes)) < 0) {
                    this.router.navigate([this.routePower]);
                    return;
                }
                this.commodityType = supplyOfferCommodityTypes[params.commodityType];
                this.loadOffers();
            });

        this.modalsService.closeModalData$
            .pipe(
                takeUntil(
                    this.destroy$,
                ),
                filter(R_.isNotNil),
                filter((modal: ICloseModalData) => modal.confirmed),
            )
            .subscribe(modal => {
                if (modal.modalType === this.supplyOfferConfig.confirmDeleteOffer) {
                    this.deleteDisabled[modal.data.row.id] = true;
                    this.offerService.deleteOffer(modal.data.row.id)
                        .pipe(
                            takeUntil(this.destroy$),
                        )
                        .subscribe(
                            () => {
                                this.deleteDisabled = [];
                            },
                            (error) => {
                                this.deleteDisabled = [];
                                const {globalError} = parseGraphQLErrors(error);
                                this.globalError = globalError;
                                this.cd.markForCheck();
                            },
                        );
                }
                if (modal.modalType === this.supplyOfferConfig.confirmCancelOffer) {
                    this.toggleRow(modal.data.table, modal.data.row);
                }
            });
    }

    public edit = (table, row) => {
        this.formValues = {
            ...row,
        };
        if (table.openedRow !== row) {
            this.toggleRow(table, row);
        }
    }

    public create = (table, row) => {
        this.formValues = <IOffer>{};
        if (table.openedRow !== row) {
            this.toggleRow(table, row);
        }
    }

    public duplicate = (table, row) => {
        this.formValues = {
            ...row,
            id: null,
        };
        if (table.openedRow !== row) {
            this.toggleRow(table, row);
        }
    }

    public delete = (table, row, currentOfferFormValues = row) => {
        if (R_.isNilOrEmptyString(currentOfferFormValues.id)) {
            this.modalsService
                .showModal$.next(this.supplyOfferConfig.confirmCancelOfferConfig({table, row, currentOfferFormValues}));
        } else {
            this.modalsService
                .showModal$.next(this.supplyOfferConfig.confirmDeleteOfferConfig({table, row, currentOfferFormValues}));
        }
    }

    public getCurrentFormValues = (values) => {
        this.currentOfferFormValues = values;
    }

    public loadOffers = () => {
        this.offerService.findSupplierOffers()
            .pipe(
                takeUntil(this.destroy$),
                map(({data}) => R.filter(
                    R.whereEq({
                        commodityType: this.commodityType,
                        status: IOfferStatus.ACTIVE},
                    ),
                )(data.findSupplierOffers)),
            )
            .subscribe(
                rows => {
                    this.tableRows = rows;
                    this.loadingOffers = false;
                    this.deleteDisabled = [];
                    this.cd.markForCheck();
                },
                error => {
                    this.deleteDisabled = [];
                    const { globalError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.cd.markForCheck();
                });
    }

    public submitForm = (supplyOfferFormData: any, table = null, row = null) => {
        this.formLoading = true;
        this.globalError = [];
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
        table.selectRow(row);
    }
}
