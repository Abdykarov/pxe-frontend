import { isPlatformBrowser } from '@angular/common';
import {
    ChangeDetectorRef,
    Component,
    HostListener,
    Inject,
    OnInit,
    PLATFORM_ID,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as R from 'ramda';
import * as R_ from 'ramda-extension';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import {
    CODE_LIST_TYPES,
    commodityTypes,
    CONSTS,
    ROUTES,
    urlCommodityToCommodityType,
} from 'src/app/app.constants';
import { ApprovalConfig } from 'src/app/pages/suppliers/import/approval/approval.config';
import {
    ImportProgressStep,
    IOfferCounts,
    IOfferImportInput,
} from 'src/app/pages/suppliers/import/import.model';
import { AbstractComponent } from 'src/common/abstract.component';
import { ModalService } from 'src/common/containers/modal/modal.service';
import { ICloseModalData } from 'src/common/containers/modal/modals/model/modal.model';
import { CommodityType } from 'src/common/graphql/models/supply.model';
import { OfferService } from 'src/common/graphql/services/offer.service';
import { SupplyService } from 'src/common/graphql/services/supply.service';
import { OffersByCommodityTypePipe } from 'src/common/pipes/common/offers-by-commodity-type/offers-by-commodity-type.pipe';
import { BannerTypeImages } from 'src/common/ui/info-banner/models/info-banner.model';
import { ITableColumnConfig } from 'src/common/ui/table/models/table.model';
import {
    getConfigStepper,
    parseGraphQLErrors,
    parseRestAPIErrors,
    transformCodeList,
    TypeStepper,
} from 'src/common/utils';

@Component({
    selector: 'pxe-approval',
    templateUrl: './approval.component.html',
    styleUrls: ['./approval.component.scss'],
})
export class ApprovalComponent extends AbstractComponent implements OnInit {
    public readonly bannerTypeImages = BannerTypeImages;
    public readonly configStepper = getConfigStepper(
        ImportProgressStep.APPROVAL,
        false,
        TypeStepper.IMPORT
    );
    public readonly routePower = ROUTES.ROUTER_IMPORT_APPROVAL_POWER;
    public readonly routeGas = ROUTES.ROUTER_IMPORT_APPROVAL_GAS;
    public commodityType = CommodityType.POWER;
    public commodityTypeAfterApprove: CommodityType;
    public commodityType$: BehaviorSubject<string> =
        new BehaviorSubject<string>(null);
    public globalError: string[] = [];
    public countOfDuplicateOffers = 0;
    public countOfGasOffers = 0;
    public countOfPowerOffers = 0;
    public offerDeleted = null;
    public tableCols: ITableColumnConfig[] = [];
    public tableRows: IOfferImportInput[] = [];

    private codeLists$: Observable<any> = this.supplyService
        .findCodelistsByTypes(CODE_LIST_TYPES, 'cs')
        .pipe(map(({ data }) => transformCodeList(data.findCodelistsByTypes)));

    @HostListener('window:beforeunload', ['$event'])
    public beforeunloadHandler(event) {
        event.preventDefault();
        event.returnValue = '';
    }

    constructor(
        private approvalConfig: ApprovalConfig,
        private cd: ChangeDetectorRef,
        private modalsService: ModalService,
        private offersByCommodityTypePipe: OffersByCommodityTypePipe,
        private offerService: OfferService,
        private route: ActivatedRoute,
        private router: Router,
        private supplyService: SupplyService,
        @Inject(PLATFORM_ID) private platformId: string
    ) {
        super();
    }

    ngOnInit() {
        let shouldInitPage = true;

        if (isPlatformBrowser(this.platformId)) {
            const offers: IOfferImportInput[] = window.history.state.offers;
            const commodityTypeAfterApprove: CommodityType =
                window.history.state.commodityTypeAfterApprove;
            if (R.isNil(offers)) {
                this.router.navigate([ROUTES.ROUTER_IMPORT_UPLOAD], {
                    queryParams: {
                        commodityType: this.commodityType,
                    },
                });
                shouldInitPage = false;
            } else {
                this.tableRows = offers;
                this.commodityTypeAfterApprove =
                    commodityTypeAfterApprove || CommodityType.POWER;
            }
        }

        if (shouldInitPage) {
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.route.params
                .pipe(
                    takeUntil(this.destroy$),
                    filter((params) => {
                        if (
                            R.indexOf(
                                urlCommodityToCommodityType[
                                    params.commodityType
                                ],
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

            this.modalsService.closeModalData$
                .pipe(
                    takeUntil(this.destroy$),
                    filter(R_.isNotNil),
                    filter((modal: ICloseModalData) => modal.confirmed)
                )
                .subscribe((modal) => {
                    if (
                        modal.modalType ===
                        CONSTS.MODAL_TYPE.CONFIRM_BACK_IMPORT
                    ) {
                        this.navigationBack();
                    }
                    this.modalsService.closeModalData$.next(null);
                });

            combineLatest([this.codeLists$, this.commodityType$])
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                    ([codeLists, commodityType]) => {
                        if (codeLists && commodityType) {
                            this.tableCols =
                                this.approvalConfig.tableCols(codeLists)[
                                    commodityType
                                ];
                            this.setCountsAndValidateCountsOfOffers();
                            this.cd.markForCheck();
                        }
                    },
                    (error) => {
                        const { globalError } = parseGraphQLErrors(error);
                        this.globalError = globalError;
                        this.cd.markForCheck();
                    }
                );
        }
    }

    private setCountsAndValidateCountsOfOffers = () => {
        const { countOfDuplicateOffers, countOfGasOffers, countOfPowerOffers } =
            this.getOfferCounts(this.tableRows);

        this.countOfDuplicateOffers = countOfDuplicateOffers;
        this.countOfGasOffers = countOfGasOffers;
        this.countOfPowerOffers = countOfPowerOffers;

        if (this.countOfPowerOffers === 0 || this.countOfGasOffers === 0) {
            this.router.navigate(
                [this.countOfPowerOffers ? this.routePower : this.routeGas],
                {
                    state: {
                        commodityTypeAfterApprove:
                            this.commodityTypeAfterApprove,
                        offers: this.tableRows,
                    },
                }
            );
        }
    };

    public backAction = (evt) => {
        evt.preventDefault();
        this.modalsService.showModal$.next(
            this.approvalConfig.confirmBackActionConfig()
        );
    };

    public approvalAction = (evt) => {
        evt.preventDefault();
        const offersImportInput = R.pipe(
            R.filter((row) => !row.duplicity),
            R.map(R.prop('offer'))
        )(this.tableRows);

        this.offerService
            .batchImport(offersImportInput)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                () => {
                    this.router.navigate(
                        [
                            this.commodityTypeAfterApprove ===
                            CommodityType.POWER
                                ? ROUTES.ROUTER_SUPPLY_OFFER_POWER
                                : ROUTES.ROUTER_SUPPLY_OFFER_GAS,
                        ],
                        {
                            state: {
                                countOfImportedOffers: offersImportInput.length,
                            },
                        }
                    );
                },
                (error) => {
                    const message = parseRestAPIErrors(error);
                    this.globalError = [message];
                    this.cd.markForCheck();
                }
            );
    };

    public navigationBack = () => {
        this.router.navigate([ROUTES.ROUTER_IMPORT_UPLOAD], {
            queryParams: {
                commodityType: this.commodityTypeAfterApprove.toUpperCase(),
            },
        });
    };

    public delete = (deletingRow) => {
        this.offerDeleted = deletingRow.offer.name;
        this.tableRows = R.filter(
            (offerImportInput: IOfferImportInput) =>
                JSON.stringify(deletingRow) !== JSON.stringify(offerImportInput)
        )(this.tableRows);

        this.setCountsAndValidateCountsOfOffers();

        if (
            !this.tableRows.length ||
            this.isZeroOffersToImportedWithoutDuplicity()
        ) {
            this.navigationBack();
        }
        this.cd.markForCheck();
    };

    public isZeroOffersToImportedWithoutDuplicity = (): boolean =>
        this.countOfPowerOffers + this.countOfGasOffers ===
        this.countOfDuplicateOffers;

    public getOfferCounts = (offers: IOfferImportInput[]): IOfferCounts => {
        const countOfDuplicateOffers = R.reduce(
            (sum: number, offerImportInput: IOfferImportInput) =>
                offerImportInput.duplicity ? ++sum : sum,
            0,
            offers
        );
        const countOfGasOffers = this.offersByCommodityTypePipe.transform(
            offers,
            CommodityType.GAS
        ).length;
        const countOfPowerOffers = this.offersByCommodityTypePipe.transform(
            offers,
            CommodityType.POWER
        ).length;
        return {
            countOfDuplicateOffers,
            countOfGasOffers,
            countOfPowerOffers,
        };
    };
}
