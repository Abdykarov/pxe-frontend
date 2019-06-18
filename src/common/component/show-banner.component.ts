import { ActivatedRoute } from '@angular/router';
import {
    ChangeDetectorRef,
    Input,
    OnInit,
} from '@angular/core';

import { AbstractComponent } from 'src/common/abstract.component';
import { IBannerObj } from 'src/common/ui/banner/models/banner-object.model';

export abstract class ShowBannerComponent extends AbstractComponent implements OnInit {

    constructor(
        protected cd: ChangeDetectorRef,
        protected route: ActivatedRoute,
    ) {
        super();
        this.showBanner = !!window.history.state.passwordWasSent;
    }

    @Input()
    public showBanner = false;

    @Input()
    public bannerObj: IBannerObj = {
        linkValue: '#',
        text: 'Vaše heslo bylo úspěšně změněno.',
        linkType: '',
        title: '',
    };
}
