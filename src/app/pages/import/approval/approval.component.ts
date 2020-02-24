import { isPlatformBrowser } from '@angular/common';
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

import * as R from 'ramda';
import * as R_ from 'ramda-extension';
import { ApprovalConfig } from 'src/app/pages/import/approval/approval.config';
import {
    filter,
    takeUntil,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { BannerTypeImages } from 'src/common/ui/info-banner/models/info-banner.model';
import { CommodityType } from 'src/common/graphql/models/supply.model';
import {
    CONSTS,
    ROUTES,
} from 'src/app/app.constants';
import { ICloseModalData } from 'src/common/containers/modal/modals/model/modal.model';
import { ITableColumnConfig } from 'src/common/ui/table/models/table.model';
import { ImportProgressStep, IOfferImportInput } from 'src/app/pages/import/import.model';
import { ModalService } from 'src/common/containers/modal/modal.service';
import {
    getConfigStepper,
    parseRestAPIErrors,
    TypeStepper,
} from 'src/common/utils';
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
            });
        }

    @HostListener('window:beforeunload', ['$event'])
    beforeunloadHandler(event) {
        event.preventDefault();
        event.returnValue = '';
    }

    backAction = (evt) => {
        evt.preventDefault();
        this.modalsService
            .showModal$.next(this.approvalConfig.confirmBackActionConfig({size: 'xl'}));
    }

    approvalAction = (evt) => {
        evt.preventDefault();
        this.offerService.batchImport(this.tableRows)
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(
                () => {
                    this.router.navigate([
                            this.commodityType === CommodityType.POWER ?
                                ROUTES.ROUTER_SUPPLY_OFFER_POWER : ROUTES.ROUTER_SUPPLY_OFFER_GAS,
                        ],
                    );
                },
                error => {
                    const message = parseRestAPIErrors(error);
                    this.globalError.push(message);
                    this.cd.markForCheck();
                });
    }

    public delete = (deletingRow, index) => {
        this.offerDeleted = deletingRow.name;
        this.tableRows.splice(index, 1);
    }
}
