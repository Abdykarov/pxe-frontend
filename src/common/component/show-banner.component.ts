import { ActivatedRoute } from '@angular/router';
import {
    ChangeDetectorRef,
    Input,
    OnInit,
} from '@angular/core';

import { takeUntil } from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { IBannerObj } from 'src/common/ui/banner/models/banner-object.model';

export abstract class ShowBannerComponent extends AbstractComponent implements OnInit {

    constructor(
        protected cd: ChangeDetectorRef,
        protected route: ActivatedRoute,
    ) {
        super();
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

    ngOnInit() {
        super.ngOnInit();
        this.route.queryParams
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(params => {
                this.showBanner = params['showBanner'];
                this.cd.markForCheck();
            });
    }
}
