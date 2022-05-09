import { Component } from '@angular/core';
import { CommodityType } from 'src/common/graphql/models/supply.model';
import { BannerTypeImages } from 'src/common/ui/info-banner/models/info-banner.model';
import { ApprovalConfig } from 'src/static/pages/import-approval/config';

@Component({
    templateUrl: './page.html',
})
export class ImportApprovalComponent {
    public bannerTypeImages = BannerTypeImages;
    public commodityType = CommodityType.POWER;
    public configStepper = this.approvalConfig.stepperProgressConfig;

    constructor(public approvalConfig: ApprovalConfig) {}

    public click = (evt) => {
        evt.preventDefault();
        console.log('click');
    };

    public backAction = (evt) => {
        evt.preventDefault();
        console.log('back');
    };
}
