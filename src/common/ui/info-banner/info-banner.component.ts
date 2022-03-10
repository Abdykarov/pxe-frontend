import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BannerTypeImages } from 'src/common/ui/info-banner/models/info-banner.model';

@Component({
    selector: 'lnd-info-banner',
    templateUrl: './info-banner.component.html',
    styleUrls: ['./info-banner.component.scss'],
})
export class InfoBannerComponent {
    @Input()
    public buttonLabel: string;

    @Input()
    public bannerTitle: string;

    @Input()
    public bannerDescription: string;

    @Input()
    public bannerType: BannerTypeImages = BannerTypeImages.HOUSE_ALERT;

    public BannerTypeImages = BannerTypeImages;

    @Input()
    public buttonCustomClass = 'info-banner__btn';

    @Input()
    public showButton = true;

    @Output()
    public buttonAction?: EventEmitter<any> = new EventEmitter<any>();

    constructor() {}
}
