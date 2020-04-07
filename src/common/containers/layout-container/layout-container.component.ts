import {
    Component,
    Inject,
    Input,
    PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

import { interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from 'src/app/services/auth.service';
import { AbstractComponent } from 'src/common/abstract.component';
import { CONSTS } from 'src/app/app.constants';
import { IBannerObj } from 'src/common/ui/banner/models/banner-object.model';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';

@Component({
    selector: 'pxe-layout-container',
    templateUrl: './layout-container.component.html',
    styleUrls: ['./layout-container.component.scss'],
})
export class LayoutContainerComponent extends AbstractComponent {
    public readonly SHOW_USER_WILL_BE_LOGOUT_INTERVAL_IN_SECONDS = CONSTS.SHOW_USER_WILL_BE_LOGOUT_INTERVAL_IN_SECONDS;

    @Input()
    public breadcrumbItemsSimple: IBreadcrumbItems;

    @Input()
    public pageTitle: string;

    public showBanner = false;

    public tokenWillExpireInSeconds = -1;

    public bannerObjChangedPassword: IBannerObj = {
        linkValue: '#',
        text: 'Vaše heslo bylo úspěšně změněno.',
        linkType: '',
        title: '',
    };

    public bannerObjTokenWillExpire: IBannerObj = {
        linkValue: '#',
        text: 'Vaše přihlášení brzy vyprší z důvodu neaktivity. K automatickému odhlášení dojde za ' + this.tokenWillExpireInSeconds + 'sekund.',
        linkType: '',
        title: '',
    };

    constructor(
        private authService: AuthService,
        private router: Router,
        @Inject(PLATFORM_ID) private platformId: string,
    ) {
        super();
        if (isPlatformBrowser(this.platformId)) {
            this.showBanner = window.history.state.showBanner;
            interval(1000)
                .pipe(takeUntil(this.destroy$))
                .subscribe(_ => {
                    if(this.router.url.includes('secured')){
                        console.log('ANO');
                        this.tokenWillExpireInSeconds = Math.floor((this.authService.currentUserValue.exp * 1000 - new Date().getTime()) / 1000)
                    }
                })
        }
    }
}
