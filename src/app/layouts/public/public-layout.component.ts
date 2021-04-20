import {
    ActivatedRoute,
    Router,
} from '@angular/router';
import {
    ChangeDetectorRef,
    Component,
    Inject,
    OnDestroy,
    OnInit,
    PLATFORM_ID,
    Renderer2,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

import * as R from 'ramda';
import { Apollo } from 'apollo-angular';
import {
    map,
    takeUntil,
} from 'rxjs/operators';

import { AbstractLayoutComponent } from 'src/app/layouts/abstract-layout.component';
import { AuthService } from 'src/app/services/auth.service';
import {
    CommodityTypesLowerCase,
    SubjectTypeLowerCase,
} from 'src/app/app.constants';
import { CookiesService } from 'src/app/services/cookies.service';
import { OverlayService } from 'src/common/graphql/services/overlay.service';
import { ReCaptchaService } from 'src/common/containers/re-captcha/re-captcha.service';
import { SAnalyticsService } from 'src/app/services/s-analytics.service';
import { ScrollToService } from 'src/app/services/scroll-to.service';

@Component({
    templateUrl: './public-layout.component.html',
    styleUrls: ['./public-layout.component.scss'],
})
export class PublicLayoutComponent extends AbstractLayoutComponent implements OnInit, OnDestroy {
    public commodityTypePower = CommodityTypesLowerCase.POWER;
    public subjectTypeIndividual = SubjectTypeLowerCase.INDIVIDUAL;
    public lastScrollTop = 0;

    constructor(
        protected apollo: Apollo,
        public authService: AuthService,
        protected cookieService: CookiesService,
        private cd: ChangeDetectorRef,
        protected overlayService: OverlayService,
        private renderer: Renderer2,
        public reCaptchaService: ReCaptchaService,
        protected route: ActivatedRoute,
        protected router: Router,
        protected sAnalyticsService: SAnalyticsService,
        public scrollToService: ScrollToService,
        @Inject(DOCUMENT) private document: any,
        @Inject(PLATFORM_ID) public platformId: string,
    ) {
        super(
            apollo,
            authService,
            cookieService,
            overlayService,
            platformId,
            route,
            router,
            sAnalyticsService,
            scrollToService,
        );

        this.overlayService.getOverlay()
            .pipe(
                takeUntil(this.destroy$),
                map(R.path(['data', 'ui', 'showOverlay'])),
            )
            .subscribe((current: boolean) => {
                this.showOverlay = current;
                this.cd.markForCheck();
            });
    }

    public ngOnInit() {
        super.ngOnInit();
        this.renderer.addClass(document.body, 'public');
    }

    public ngOnDestroy() {
        super.ngOnDestroy();
        this.renderer.removeClass(document.body, 'public');
    }

    public logout = () => this.authService.logoutForced(false);
}
