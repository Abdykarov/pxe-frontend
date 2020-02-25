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
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import * as R from 'ramda';
import * as R_ from 'ramda-extension';

import { AbstractComponent } from 'src/common/abstract.component';
import { ApprovalConfig } from 'src/app/pages/import/approval/approval.config';
import { BannerTypeImages } from 'src/common/ui/info-banner/models/info-banner.model';
import { CommodityType } from 'src/common/graphql/models/supply.model';
import {
    CONSTS,
    ROUTES,
} from 'src/app/app.constants';
import {
    filter,
    takeUntil,
} from 'rxjs/operators';
import {
    getConfigStepper,
    parseRestAPIErrors,
    TypeStepper,
} from 'src/common/utils';
import { ICloseModalData } from 'src/common/containers/modal/modals/model/modal.model';
import { ITableColumnConfig } from 'src/common/ui/table/models/table.model';
import { ImportProgressStep, IOfferImportInput } from 'src/app/pages/import/import.model';
import { ModalService } from 'src/common/containers/modal/modal.service';
import { OfferService } from 'src/common/graphql/services/offer.service';

@Component({
    selector: 'pxe-approval',
    templateUrl: './approval.component.html',
    styleUrls: ['./approval.component.scss'],
})
export class ApprovalComponent extends AbstractComponent implements OnInit {
    public readonly bannerTypeImages = BannerTypeImages;
    public readonly configStepper = getConfigStepper(ImportProgressStep.APPROVAL, false, TypeStepper.IMPORT);
    public commodityType = CommodityType.POWER;
    public globalError: string[] = [];
    public numberOfDuplicateOffers = 0;
    public offerDeleted = null;
    public tableCols: ITableColumnConfig[] = [];
    public tableRows: IOfferImportInput[] = [];

    constructor(
        private approvalConfig: ApprovalConfig,
        private cd: ChangeDetectorRef,
        private modalsService: ModalService,
        private offerService: OfferService,
        private route: ActivatedRoute,
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: string,
    ) {
        super();
    }

    ngOnInit() {
        this.commodityType = this.route.snapshot.queryParams['commodityType'];
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
        this.tableCols = this.approvalConfig.tableCols[this.commodityType];
        this.tableRows = window.history.state.offers;
        this.setNumberOfDuplicateOffers();
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
                    this.router.navigate([
                            this.commodityType === CommodityType.POWER ?
                                ROUTES.ROUTER_SUPPLY_OFFER_POWER : ROUTES.ROUTER_SUPPLY_OFFER_GAS,
                        ],
                        {
                            state: {
                                numberOfImportedOffers: offersImportInput.length,
                            },
                        },
                    );
                },
                error => {
                    const message = parseRestAPIErrors(error);
                    this.globalError = [message];
                    this.cd.markForCheck();
                });
    }

    public navigationBack = () => {
        this.router.navigate([
                ROUTES.ROUTER_IMPORT_UPLOAD,
            ],
            {
                queryParams: {
                    commodityType: this.commodityType,
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
    }

    public setNumberOfDuplicateOffers = () => {
        this.numberOfDuplicateOffers = R.reduce((sum: number, offerImportInput: IOfferImportInput) => {
            return (offerImportInput.duplicity ? ++sum : sum);
        }, 0, this.tableRows);
    }
}
