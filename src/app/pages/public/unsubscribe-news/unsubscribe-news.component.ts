import { Component } from '@angular/core';

import { BannerTypeImages } from 'src/common/ui/info-banner/models/info-banner.model';

@Component({
    selector: 'pxe-unsubscribe-news',
    templateUrl: './unsubscribe-news.component.html',
    styleUrls: ['./unsubscribe-news.component.scss'],
})
export class UnsubscribeNewsComponent {
    public BannerTypeImages = BannerTypeImages;
}
