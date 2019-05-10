import {
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';

@Component({
    selector: 'lnd-info-banner',
    templateUrl: './info-banner.component.html',
    styleUrls: ['./info-banner.component.scss'],
})
export class InfoBannerComponent {

    @Input()
    public bannerLabel: string;

    @Input()
    public bannerTitle: string;

    @Input()
    public bannerDescription: string;

    @Input()
    public srcImg = '/assets/images/illustrations/house-alert.svg';

    @Input()
    public customClassButton  = 'info-banner__btn';

    @Output()
    public bannerAction?: EventEmitter<any> = new EventEmitter<any>();

    constructor() {}
}
