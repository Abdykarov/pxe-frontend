import {
    ActivatedRoute,
    Router,
} from '@angular/router';
import {
    Component,
    OnInit,
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
import { ICloseModalData } from 'src/common/containers/modal/modals/model/modal.model';
import { ITableColumnConfig } from 'src/common/ui/table/models/table.model';
import { ImportProgressStep } from 'src/app/pages/import/import.model';
import { ModalService } from 'src/common/containers/modal/modal.service';
import {
    getConfigStepper,
    parseGraphQLErrors,
    TypeStepper,
} from 'src/common/utils';
import { CONSTS, ROUTES } from 'src/app/app.constants';

@Component({
    selector: 'pxe-approval',
    templateUrl: './approval.component.html',
    styleUrls: ['./approval.component.scss'],
})
export class ApprovalComponent extends AbstractComponent implements OnInit {
    public readonly configStepper = getConfigStepper(ImportProgressStep.APPROVAL, false, TypeStepper.IMPORT);
    public commodityType = CommodityType.POWER;
    public tableCols: ITableColumnConfig[] = [];
    public tableRows = this.approvalConfig.tableRows;
    public bannerTypeImages = BannerTypeImages;
    public numberOfNewOffers = 5;
    // po sluzbach sjendotit s mnozstvi table rows
    public globalError: string[] = [];
    public offerDeleted = null;

    constructor(
        private approvalConfig: ApprovalConfig,
        private modalsService: ModalService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        super();
    }

    ngOnInit() {
        this.route.queryParams
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(params => {
                const commodityType = params['commodityType'];
                if (!commodityType || !CommodityType[commodityType]) {
                    this.commodityType = CommodityType.POWER;
                }
                this.commodityType = commodityType;
                this.tableCols = this.approvalConfig.tableCols[this.commodityType];
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

    backAction = (evt) => {
        evt.preventDefault();
        this.modalsService
            .showModal$.next(this.approvalConfig.confirmBackActionConfig({size: 'xl'}));
    }

    approvalAction = (evt) => {
        evt.preventDefault();
        this.router.navigate([
                this.commodityType === CommodityType.POWER ?
                    ROUTES.ROUTER_SUPPLY_OFFER_POWER : ROUTES.ROUTER_SUPPLY_OFFER_GAS,
            ],
        );
    }

    public delete = (deletingWow) => {
        this.offerDeleted = deletingWow.name;
        this.tableRows = R.filter((row => row.id !==  deletingWow.id), this.tableRows);
    }
}
