import {
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { Router } from '@angular/router';

// own classes
import { AbstractComponent } from 'src/common/abstract.component';

// own models
import { IBannerObj } from './models/banner-object.model';

@Component({
    selector: 'lnd-banner-ui',
    templateUrl: './banner-ui.component.html',
    styleUrls: ['./banner-ui.component.scss'],
})
export class BannerUIComponent extends AbstractComponent {
    @Input()
    public buttonLabel: string;

    @Input()
    public data?: IBannerObj;

    @Input()
    public staticBannerTitle?: string;

    @Output()
    public staticBannerAction?: EventEmitter<any> = new EventEmitter<any>();

    public bannerAction(value: string, type: string, state: any = null) {
        if (type === 'external') {
            window.open(value);
        } else {
            this.router.navigate([value], {state});
        }
    }

    constructor(
        private router: Router,
    ) {
        super();
    }
}
