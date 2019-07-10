import {
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';

import {
    CONSTS,
    IMAGE_TYPE,
} from 'src/app/app.constants';

@Component({
    selector: 'lnd-info-banner',
    templateUrl: './info-banner.component.html',
    styleUrls: ['./info-banner.component.scss'],
})
export class InfoBannerComponent {

    public imageTypes = CONSTS.IMAGES;

    @Input()
    public buttonLabel: string;

    @Input()
    public bannerTitle: string;

    @Input()
    public bannerDescription: string;

    @Input()
    public bannerImageType: IMAGE_TYPE = IMAGE_TYPE.HOUSE_ALERT;

    @Input()
    public buttonCustomClass  = 'info-banner__btn';

    @Input()
    public showButton = true;

    @Output()
    public buttonAction?: EventEmitter<any> = new EventEmitter<any>();

    constructor() {}
}
