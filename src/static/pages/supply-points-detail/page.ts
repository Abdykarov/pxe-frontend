import { Component } from '@angular/core';
import { defaultBannerObj } from './config';

@Component({
    templateUrl: './page.html',
})
export class SupplyPointsDetailPageComponent {
    public bannerObj = defaultBannerObj;
}
