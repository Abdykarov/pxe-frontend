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
    filter,
    takeUntil,
} from 'rxjs/operators';

import {
    commodityTypes,
    CONSTS,
    ROUTES,
} from 'src/app/app.constants';
import { ApprovalConfig } from 'src/app/pages/import/approval/approval.config';
import { AbstractComponent } from 'src/common/abstract.component';
import { BannerTypeImages } from 'src/common/ui/info-banner/models/info-banner.model';
import { CommodityType } from 'src/common/graphql/models/supply.model';
import { ICloseModalData } from 'src/common/containers/modal/modals/model/modal.model';
import {
    ImportProgressStep,
    IOfferImportInput,
} from 'src/app/pages/import/import.model';
import { ITableColumnConfig } from 'src/common/ui/table/models/table.model';
import { ModalService } from 'src/common/containers/modal/modal.service';
import { OffersByCommodityTypePipe } from 'src/common/pipes/offers-by-commodity-type/offers-by-commodity-type.pipe';
import { OfferService } from 'src/common/graphql/services/offer.service';
import {
    getConfigStepper,
    parseRestAPIErrors,
    TypeStepper,
} from 'src/common/utils';

@Component({
    selector: 'pxe-approval',
    templateUrl: './approval.component.html',
    styleUrls: ['./approval.component.scss'],
})
export class ApprovalComponent extends AbstractComponent implements OnInit {
    public readonly bannerTypeImages = BannerTypeImages;
    public readonly configStepper = getConfigStepper(ImportProgressStep.APPROVAL, false, TypeStepper.IMPORT);
    public readonly routePower = ROUTES.ROUTER_IMPORT_APPROVAL_POWER;
    public readonly routeGas = ROUTES.ROUTER_IMPORT_APPROVAL_GAS;
    public commodityTypeAfterRender: CommodityType;
    public commodityType = CommodityType.POWER;
    public globalError: string[] = [];
    public numberOfDuplicateOffers = 0;
    public numberOfGasOffers = 0;
    public numberOfPowerOffers = 0;
    public offerDeleted = null;
    public tableCols: ITableColumnConfig[] = [];
    public tableRows: IOfferImportInput[] = [];

    constructor(
        private approvalConfig: ApprovalConfig,
        private cd: ChangeDetectorRef,
        private modalsService: ModalService,
        private offersByCommodityTypePipe: OffersByCommodityTypePipe,
        private offerService: OfferService,
        private route: ActivatedRoute,
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: string,
    ) {
        super();
    }

    ngOnInit() {
        this.tableRows = window.history.state.offers;
        if (isPlatformBrowser(this.platformId)) {
            if (!window.history.state.offers) {
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
        }
        this.route.params
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(params => {
                if (R.indexOf(params.commodityType, R.keys(commodityTypes)) < 0) {
                    this.router.navigate([this.routePower]);
                    return;
                }
                this.setStateOfNavigationLink();
                this.commodityType = commodityTypes[params.commodityType];
                this.tableCols = this.approvalConfig.tableCols[this.commodityType];
                this.setNumberOfDuplicateOffers();
                if (!this.commodityTypeAfterRender) {
                    this.commodityTypeAfterRender = commodityTypes[params.commodityType];
                }
                this.cd.markForCheck();
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
            });
        }

    @HostListener('window:beforeunload', ['$event'])
    public beforeunloadHandler(event) {
        event.preventDefault();
        event.returnValue = '';
    }

    public backAction = (evt) => {
        evt.preventDefault();
        this.modalsService
            .showModal$.next(this.approvalConfig.confirmBackActionConfig({size: 'xl'}));
    }

    public approvalAction = (evt) => {
        evt.preventDefault();
        const offersImportInput =
            R.map(
                (offerImportInput: IOfferImportInput) => offerImportInput.offerInput,
            )(this.tableRows);

        this.offerService.batchImport(offersImportInput)
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(
                () => {
                    const numberOfImportedOffers = offersImportInput.length;
                    this.router.navigate([
                            this.commodityType === CommodityType.POWER ?
                                ROUTES.ROUTER_SUPPLY_OFFER_POWER : ROUTES.ROUTER_SUPPLY_OFFER_GAS,
                        ],
                        {
                            state: {
                                numberOfImportedOffers,
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
                    commodityType: this.commodityTypeAfterRender,
                },
            },
        );
    }

    public delete = (deletingRow, index) => {
        this.offerDeleted = deletingRow.offerInput.name;
        this.tableRows.splice(index, 1);
        if (!this.tableRows.length) {
            this.navigationBack();
        }
        this.setNumberOfDuplicateOffers();
        this.setStateOfNavigationLink();
    }

    public setNumberOfDuplicateOffers = () => {
        this.numberOfDuplicateOffers = R.reduce((sum: number, offerImportInput: IOfferImportInput) => {
            return (offerImportInput.duplicity ? ++sum : sum);
        }, 0, this.tableRows);
    }

    public setStateOfNavigationLink = () => {
        this.numberOfGasOffers = this.offersByCommodityTypePipe.transform(this.tableRows, CommodityType.GAS).length;
        this.numberOfPowerOffers = this.offersByCommodityTypePipe.transform(this.tableRows, CommodityType.POWER).length;
        if (this.numberOfPowerOffers === 0) {
            this.router.navigate([this.routeGas]);
            return;
        }
        if (this.numberOfGasOffers === 0) {
            this.router.navigate([this.routePower]);
            return;
        }
    }
}
