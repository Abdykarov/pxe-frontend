import {
    ActivatedRoute,
    Router,
} from '@angular/router';
import {
    ChangeDetectorRef,
    Component,
    HostListener,
    Inject,
    OnInit,
    PLATFORM_ID,
    ViewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import * as R from 'ramda';
import * as R_ from 'ramda-extension';
import {
    BehaviorSubject,
    combineLatest,
    Observable,
} from 'rxjs';
import {
    filter,
    map,
    takeUntil,
} from 'rxjs/operators';

import {
    CODE_LIST_TYPES,
    commodityTypes,
    CONSTS,
    ROUTES,
} from 'src/app/app.constants';
import { ApprovalConfig } from 'src/app/pages/import/approval/approval.config';
import { AbstractComponent } from 'src/common/abstract.component';
import { BannerTypeImages } from 'src/common/ui/info-banner/models/info-banner.model';
import { CommodityType } from 'src/common/graphql/models/supply.model';
import {
    getConfigStepper,
    parseGraphQLErrors,
    parseRestAPIErrors,
    transformCodeList,
    TypeStepper,
} from 'src/common/utils';
import { ICloseModalData } from 'src/common/containers/modal/modals/model/modal.model';
import {
    ImportProgressStep, IOfferCounts,
    IOfferImportInput,
} from 'src/app/pages/import/import.model';
import { ITableColumnConfig } from 'src/common/ui/table/models/table.model';
import { ModalService } from 'src/common/containers/modal/modal.service';
import { OffersByCommodityTypePipe } from 'src/common/pipes/offers-by-commodity-type/offers-by-commodity-type.pipe';
import { OfferService } from 'src/common/graphql/services/offer.service';
import { SupplyService } from 'src/common/graphql/services/supply.service';

@Component({
    selector: 'pxe-approval',
    templateUrl: './approval.component.html',
    styleUrls: ['./approval.component.scss'],
})
export class ApprovalComponent extends AbstractComponent implements OnInit {

    constructor(
        private approvalConfig: ApprovalConfig,
        private cd: ChangeDetectorRef,
        private modalsService: ModalService,
        private offersByCommodityTypePipe: OffersByCommodityTypePipe,
        private offerService: OfferService,
        private route: ActivatedRoute,
        private router: Router,
        private supplyService: SupplyService,
        @Inject(PLATFORM_ID) private platformId: string,
    ) {
        super();
    }

    public readonly bannerTypeImages = BannerTypeImages;
    public readonly configStepper = getConfigStepper(ImportProgressStep.APPROVAL, false, TypeStepper.IMPORT);
    public readonly routePower = ROUTES.ROUTER_IMPORT_APPROVAL_POWER;
    public readonly routeGas = ROUTES.ROUTER_IMPORT_APPROVAL_GAS;
    public commodityTypeAfterRender: CommodityType;
    public commodityType = CommodityType.POWER;
    private commodityType$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    public globalError: string[] = [];
    public numberOfDuplicateOffers = 0;
    public numberOfGasOffers = 0;
    public numberOfPowerOffers = 0;
    public offerDeleted = null;
    public tableCols: ITableColumnConfig[] = [];
    public tableRows: IOfferImportInput[] = [];

    private codeLists$: Observable<any> = this.supplyService.findCodelistsByTypes(CODE_LIST_TYPES, 'cs')
        .pipe(
            map(({data}) => transformCodeList(data.findCodelistsByTypes)),
        );

    @HostListener('window:beforeunload', ['$event'])
    public beforeunloadHandler(event) {
        event.preventDefault();
        event.returnValue = '';
    }

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            const offers: IOfferImportInput[] = window.history.state.offers;
            if (R.isNil(offers)) {
                this.router.navigate([
                        ROUTES.ROUTER_IMPORT_UPLOAD,
                    ],
                    {
                        queryParams: {
                            commodityType: this.commodityType,
                        },
                    },
                );
                return;
            }
            if (!R.isNil(offers)) {
                this.tableRows = offers;
            }
        }

        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.route.params
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(params => {
                if (R.indexOf(params.commodityType, R.keys(commodityTypes)) < 0) {
                    this.router.navigate([this.routePower]);
                    return;
                }
                this.commodityType = commodityTypes[params.commodityType];
                if (!this.commodityTypeAfterRender) {
                    this.commodityTypeAfterRender = commodityTypes[params.commodityType];
                }
                this.commodityType$.next(this.commodityType);
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
                if (modal.modalType === CONSTS.MODAL_TYPE.CONFIRM_BACK_IMPORT) {
                    this.navigationBack();
                }
                this.modalsService.closeModalData$.next(null);
            });

        combineLatest(this.codeLists$, this.commodityType$)
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(
                ([codeLists, commodityType]) => {
                    if (codeLists && commodityType) {
                        this.tableCols = this.approvalConfig.tableCols(codeLists)[commodityType];
                        const {
                            numberOfDuplicateOffers,
                            numberOfGasOffers,
                            numberOfPowerOffers,
                        } = this.getOfferCounts(this.tableRows);

                        this.numberOfDuplicateOffers = numberOfDuplicateOffers;
                        this.numberOfGasOffers = numberOfGasOffers;
                        this.numberOfPowerOffers = numberOfPowerOffers;

                        if (this.numberOfPowerOffers === 0) {
                            this.router.navigate([this.routeGas]);
                            return;
                        }

                        if (this.numberOfGasOffers === 0) {
                            this.router.navigate([this.routePower]);
                            return;
                        }
                        this.cd.markForCheck();
                    }
                },
                error => {
                    const { globalError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.cd.markForCheck();
                });

    }

    public backAction = (evt) => {
        evt.preventDefault();
        this.modalsService
            .showModal$.next(this.approvalConfig.confirmBackActionConfig());
    }

    public approvalAction = (evt) => {
        evt.preventDefault();
        const offersImportInput =
            R.map(
                (offerImportInput: IOfferImportInput) => offerImportInput.offer,
            )(this.tableRows);

        this.offerService.batchImport(offersImportInput)
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(
                () => {
                    this.router.navigate([
                            this.commodityType === CommodityType.POWER ?
                                ROUTES.ROUTER_SUPPLY_OFFER_POWER : ROUTES.ROUTER_SUPPLY_OFFER_GAS,
                        ],
                        {
                            state: {
                                numberOfImportedOffers: offersImportInput.length - this.numberOfDuplicateOffers,
                            },
                        },
                    );
                },
                error => {
                    const message = parseRestAPIErrors(error);
                    this.globalError = [message];
                    this.cd.markForCheck();
                },
            );
    }

    public navigationBack = () => {
        this.router.navigate([
                ROUTES.ROUTER_IMPORT_UPLOAD,
            ],
            {
                queryParams: {
                    commodityType: this.commodityTypeAfterRender.toUpperCase(),
                },
            },
        );
    }

    public delete = (deletingRow) => {
        this.offerDeleted = deletingRow.offer.name;
        this.tableRows = R.filter((offerImportInput: IOfferImportInput) => {
            return JSON.stringify(deletingRow) !== JSON.stringify(offerImportInput);
        })(this.tableRows);

        const {
            numberOfDuplicateOffers,
            numberOfGasOffers,
            numberOfPowerOffers,
        } = this.getOfferCounts(this.tableRows);

        this.numberOfDuplicateOffers = numberOfDuplicateOffers;
        this.numberOfGasOffers = numberOfGasOffers;
        this.numberOfPowerOffers = numberOfPowerOffers;

        if (this.numberOfPowerOffers === 0) {
            this.router.navigate([this.routeGas]);
            return;
        }

        if (this.numberOfGasOffers === 0) {
            this.router.navigate([this.routePower]);
            return;
        }

        if (!this.tableRows.length || this.isZeroOffersToImportedWithoutDuplicity()) {
            this.navigationBack();
        }
        this.cd.markForCheck();
    }

    public isZeroOffersToImportedWithoutDuplicity = (): boolean =>
        (this.numberOfPowerOffers + this.numberOfGasOffers) === this.numberOfDuplicateOffers

    public getOfferCounts = (offers: IOfferImportInput[]): IOfferCounts => {
        const numberOfDuplicateOffers =
            R.reduce((sum: number, offerImportInput: IOfferImportInput) => (offerImportInput.duplicity ? ++sum : sum), 0, offers);
        const numberOfGasOffers = this.offersByCommodityTypePipe.transform(offers, CommodityType.GAS).length;
        const numberOfPowerOffers = this.offersByCommodityTypePipe.transform(offers, CommodityType.POWER).length;
        return {
            numberOfDuplicateOffers,
            numberOfGasOffers,
            numberOfPowerOffers,
        };
    }
}
