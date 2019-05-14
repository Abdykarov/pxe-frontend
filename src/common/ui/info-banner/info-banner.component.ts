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
    public buttonLabel: string;

    @Input()
    public bannerTitle: string;

    @Input()
    public bannerDescription: string;

    @Input()
    public bannerImageSrc = '/assets/images/illustrations/house-alert.svg';

    @Input()
    public buttonCustomClass  = 'info-banner__btn';

    @Output()
    public buttonAction?: EventEmitter<any> = new EventEmitter<any>();

    constructor() {}
}
