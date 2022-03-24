import { isPlatformBrowser } from '@angular/common';
import {
    ChangeDetectorRef,
    Component,
    Inject,
    OnInit,
    PLATFORM_ID,
    ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as R from 'ramda';
import * as R_ from 'ramda-extension';
import { BehaviorSubject, combineLatest, forkJoin, Observable } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import {
    CODE_LIST_TYPES,
    commodityTypes,
    CONSTS,
    ROUTES,
    urlCommodityToCommodityType,
} from 'src/app/app.constants';
import { AuthService } from 'src/app/services/auth.service';
import { DocumentService } from 'src/app/services/document.service';
import { IResponseDataDocument } from 'src/app/services/model/document.model';
import { AbstractComponent } from 'src/common/abstract.component';
import { cantDeleteAllMarkedOffers } from 'src/common/constants/errors.constant';
import { formFields } from 'src/common/containers/form/forms/supply-offer/configs/supply-offer-form.config';
import { IFieldError } from 'src/common/containers/form/models/form-definition.model';
import { ModalService } from 'src/common/containers/modal/modal.service';
import { ICloseModalData } from 'src/common/containers/modal/modals/model/modal.model';
import {
    IOffer,
    IOfferInput,
    IOfferInputGasAttributes,
    IOfferInputPowerAttributes,
} from 'src/common/graphql/models/offer.model';
import { CommodityType } from 'src/common/graphql/models/supply.model';
import { OfferService } from 'src/common/graphql/services/offer.service';
import { SupplyService } from 'src/common/graphql/services/supply.service';
import { BannerTypeImages } from 'src/common/ui/info-banner/models/info-banner.model';
import { ITableColumnConfig } from 'src/common/ui/table/models/table.model';
import { TableComponent } from 'src/common/ui/table/table.component';
import {
    parseGraphQLErrors,
    parseRestAPIErrors,
    transformCodeList,
} from 'src/common/utils';
import { SupplyOfferConfig } from './supply-offer.config';

@Component({
    selector: 'pxe-supply-offer',
    templateUrl: './supply-offer.component.html',
    styleUrls: ['./supply-offer.component.scss'],
})
export class SupplyOfferComponent extends AbstractComponent implements OnInit {
    @ViewChild('table', { static: true })
    public lndTable: TableComponent;

    public readonly bannerTypeImages = BannerTypeImages;
    public commodityType = CommodityType.POWER;
    public commodityTypeOptions = CommodityType;
    public currentOfferFormValues = {};
    public deleteDisabled: boolean[] = [];
    public exporting = false;
    public fieldError: IFieldError = {};
    public formFields = formFields;
    public formLoading = false;
    public formSent = false;
    public formValues = <IOffer>{};
    public globalError: string[] = [];
    public globalFormError: string[] = [];
    private initRows = false;
    public loadingOffers = true;
    public numberOfDeletedOffers = 0;
    public countOfImportedOffers = 0;
    public numberOfMarked = 0;
    public showDeletedOfferBanner = false;
    public offerFormInEmptyPage = false;
    public tableRows: IOffer[] = [];
    public tableCols: ITableColumnConfig[] = [];
    public routePower = ROUTES.ROUTER_SUPPLY_OFFER_POWER;
    public routeGas = ROUTES.ROUTER_SUPPLY_OFFER_GAS;

    private commodityType$: BehaviorSubject<string> =
        new BehaviorSubject<string>(null);
    private codeLists$: Observable<any> = this.supplyService
        .findCodelistsByTypes(CODE_LIST_TYPES, 'cs')
        .pipe(map(({ data }) => transformCodeList(data.findCodelistsByTypes)));
    private offers$: Observable<IOffer[]> = this.commodityType$
        .asObservable()
        .pipe(
            filter(R.complement(R.equals)(null)),
            switchMap((commodityType: CommodityType) =>
                this.offerService
                    .findSupplierOffers(this.commodityType)
                    .pipe(map(({ data }) => data.findSupplierOffers))
            )
        );

    constructor(
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private documentService: DocumentService,
        private modalsService: ModalService,
        private offerService: OfferService,
        private route: ActivatedRoute,
        private router: Router,
        public supplyOfferConfig: SupplyOfferConfig,
        private supplyService: SupplyService,
        @Inject(PLATFORM_ID) private platformId: string
    ) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        if (isPlatformBrowser(this.platformId)) {
            this.countOfImportedOffers =
                window.history.state.countOfImportedOffers;
        }

        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.route.params
            .pipe(
                takeUntil(this.destroy$),
                filter((params) => {
                    if (
                        R.indexOf(
                            urlCommodityToCommodityType[params?.commodityType],
                            R.keys(commodityTypes)
                        ) < 0
                    ) {
                        this.router.navigate([this.routePower]);
                        return false;
                    }
                    return true;
                })
            )
            .subscribe((params) => {
                this.commodityType =
                    commodityTypes[
                        urlCommodityToCommodityType[params.commodityType]
                    ];
                this.commodityType$.next(this.commodityType);
            });

        combineLatest([this.codeLists$, this.offers$, this.commodityType$])
            .pipe(
                takeUntil(this.destroy$),
                filter(
                    ([codeLists, offers, commodityType]) =>
                        !!(codeLists && offers)
                )
            )
            .subscribe(
                ([codeLists, offers, commodityType]) => {
                    console.log('TABLE');
                    this.tableRows = offers;
                    if (!this.initRows) {
                        this.tableCols =
                            this.supplyOfferConfig.tableCols(codeLists)[
                                commodityType
                            ];
                        this.numberOfMarked = this.offerService.markAll(
                            false,
                            this.commodityType
                        );
                        this.initRows = true;
                    }
                    this.loadingOffers = false;
                    this.deleteDisabled = [];
                    this.cd.markForCheck();
                },
                (error) => {
                    this.deleteDisabled = [];
                    const { globalError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.cd.markForCheck();
                }
            );

        this.modalsService.closeModalData$
            .pipe(
                takeUntil(this.destroy$),
                filter(R_.isNotNil),
                filter((modal: ICloseModalData) => modal.confirmed)
            )
            .subscribe((modal) => {
                if (
                    modal.modalType === CONSTS.MODAL_TYPE.CONFIRM_DELETE_OFFER
                ) {
                    this.deleteDisabled[modal.data.row.id] = true;
                    this.offerService
                        .deleteOffer(modal.data.row.id, this.commodityType)
                        .pipe(takeUntil(this.destroy$))
                        .subscribe(
                            () => {
                                if (R.path(['data', 'row', 'marked'], modal)) {
                                    this.numberOfMarked--;
                                }
                                this.deleteDisabled = [];
                                this.cd.markForCheck();
                            },
                            (error) => {
                                this.deleteDisabled = [];
                                const { globalError } =
                                    parseGraphQLErrors(error);
                                this.globalFormError = globalError;
                                this.cd.markForCheck();
                            }
                        );
                }
                if (modal.modalType === CONSTS.MODAL_TYPE.CONFIRM_INFO_OFFER) {
                    setTimeout((_) => {
                        const lastUpdatedOffer = R.head(
                            document.getElementsByClassName(
                                CONSTS.IS_LAST_UPDATED_OFFER
                            )
                        );
                        lastUpdatedOffer?.scrollIntoView({
                            behavior: 'auto',
                            block: 'start',
                            inline: 'nearest',
                        });
                    });
                }
                if (
                    modal.modalType === CONSTS.MODAL_TYPE.CONFIRM_CANCEL_OFFER
                ) {
                    this.toggleRow(modal.data.table, modal.data.row);
                }
                if (
                    modal.modalType === CONSTS.MODAL_TYPE.CONFIRM_DELETE_MARKED
                ) {
                    const offersObserversForDeleting =
                        this.offerService.deleteMarkedOffer(this.commodityType);
                    if (offersObserversForDeleting.length === 0) {
                        return;
                    }
                    this.loadingOffers = true;
                    forkJoin(offersObserversForDeleting)
                        .pipe(takeUntil(this.destroy$))
                        .subscribe(
                            (respones: any[]) => {
                                let numberOfDeletedOffers = 0;
                                R.forEach((response) => {
                                    if (response.isError) {
                                        this.globalError = [
                                            cantDeleteAllMarkedOffers,
                                        ];
                                    } else {
                                        numberOfDeletedOffers++;
                                        this.showDeletedOfferBanner = true;
                                    }
                                })(respones);
                                this.numberOfDeletedOffers =
                                    numberOfDeletedOffers;
                                this.numberOfMarked =
                                    this.numberOfMarked - numberOfDeletedOffers;
                                this.loadingOffers = false;
                                this.cd.markForCheck();
                            },
                            (error) => {
                                this.loadingOffers = false;
                                this.globalError = [cantDeleteAllMarkedOffers];
                                this.cd.markForCheck();
                            }
                        );
                }
                this.modalsService.closeModalData$.next(null);
            });
    }

    public toggleOfferFormInEmptyPage = (evt) => {
        evt.preventDefault();
        this.offerFormInEmptyPage = !this.offerFormInEmptyPage;
    };

    public createNewOffer = (evt) => {
        evt.preventDefault();
        if (isPlatformBrowser(this.platformId)) {
            this.create(this.lndTable, this.tableRows[0]);
        }
    };

    public navigateToImportOffer = (evt) => {
        evt.preventDefault();
        this.router.navigate([ROUTES.ROUTER_IMPORT_UPLOAD], {
            queryParams: {
                commodityType: this.commodityType,
            },
        });
    };

    public exportOffers = (evt) => {
        this.exporting = true;
        evt.preventDefault();
        this.offerService
            .exportCSV()
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                (responseDataDocument: IResponseDataDocument) => {
                    this.exporting = false;
                    this.documentService.documentSave(responseDataDocument);
                    this.cd.markForCheck();
                },
                (error) => {
                    this.exporting = false;
                    const message = parseRestAPIErrors(error);
                    this.globalError.push(message);
                    this.cd.markForCheck();
                }
            );
    };

    public edit = (table, row) => {
        this.showDeletedOfferBanner = false;
        this.globalFormError = [];
        this.formValues = {
            ...row,
        };
        if (table.openedRow !== row) {
            this.toggleRow(table, row);
        }
    };

    public create = (table, row) => {
        this.showDeletedOfferBanner = false;
        this.globalFormError = [];
        this.formValues = <IOffer>{};
        if (table.openedRow !== row) {
            this.toggleRow(table, row);
        }
    };

    public duplicate = (table, row) => {
        this.showDeletedOfferBanner = false;
        this.globalFormError = [];
        this.formValues = {
            ...row,
            id: null,
        };
        if (table.openedRow !== row) {
            this.toggleRow(table, row);
        }
    };

    public delete = (table, row, currentOfferFormValues = row) => {
        this.showDeletedOfferBanner = false;
        if (R_.isNilOrEmptyString(currentOfferFormValues.id)) {
            this.modalsService.showModal$.next(
                this.supplyOfferConfig.confirmCancelOfferConfig({
                    table,
                    row,
                    currentOfferFormValues,
                })
            );
        } else {
            this.globalFormError = [];
            this.modalsService.showModal$.next(
                this.supplyOfferConfig.confirmDeleteOfferConfig({
                    table,
                    row,
                    currentOfferFormValues,
                })
            );
        }
    };

    public getCurrentFormValues = (values) => {
        this.currentOfferFormValues = values;
    };

    public submitForm = (
        supplyOfferFormData: any,
        table = null,
        row = null
    ) => {
        this.showDeletedOfferBanner = false;
        this.formLoading = true;
        this.globalFormError = [];
        this.fieldError = {};
        let offerPointAction;
        const isCreateAction = R.isNil(supplyOfferFormData.id);
        const id = supplyOfferFormData.id;

        const offer: IOfferInput = R.pick(
            [
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
                'greenEnergy',
            ],
            supplyOfferFormData
        );

        offer.supplierId = this.authService.currentUserValue.subjectId;

        if (supplyOfferFormData.commodityType === CommodityType.POWER) {
            const powerAttributes: IOfferInputPowerAttributes = R.pick(
                [
                    'priceVT',
                    'priceNT',
                    'distributionRateId',
                    'circuitBreakerId',
                ],
                supplyOfferFormData
            );
            offerPointAction = isCreateAction
                ? this.offerService.savePowerOffer(offer, powerAttributes)
                : this.offerService.updatePowerOffer(
                      id,
                      offer,
                      powerAttributes
                  );
        } else {
            const gasAttributes: IOfferInputGasAttributes = R.pick(
                ['priceGas', 'annualConsumptionId'],
                supplyOfferFormData
            );
            offerPointAction = isCreateAction
                ? this.offerService.saveGasOffer(offer, gasAttributes)
                : this.offerService.updateGasOffer(id, offer, gasAttributes);
        }

        offerPointAction.subscribe(
            (data) => {
                this.modalsService.showModal$.next(
                    this.supplyOfferConfig.confirmInfo(isCreateAction)
                );
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
            }
        );
    };

    public cancel = (event, table = null, row = null) => {
        this.showDeletedOfferBanner = false;
        if (table && row) {
            this.toggleRow(table, row);
        }
    };

    public toggleRow = (table, row) => {
        table.openRow(row);
        table.selectRow(row);
    };

    public deleteMarkedOffers = () => {
        this.showDeletedOfferBanner = false;
        this.modalsService.showModal$.next(
            this.supplyOfferConfig.confirmDeleteMarkedConfig(
                this.numberOfMarked,
                this.commodityType
            )
        );
    };

    public markOne = (id: string, evt) => {
        this.showDeletedOfferBanner = false;
        evt.preventDefault();
        evt.cancelBubble = false;
        this.showDeletedOfferBanner = false;
        this.numberOfMarked = this.offerService.markOne(id, this.commodityType);
    };

    public markAll = (evt) => {
        this.showDeletedOfferBanner = false;
        evt.preventDefault();
        evt.cancelBubble = false;
        this.showDeletedOfferBanner = false;
        this.numberOfMarked = this.offerService.markAll(
            this.tableRows.length !== this.numberOfMarked,
            this.commodityType
        );
    };
}
