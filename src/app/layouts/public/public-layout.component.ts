import {
    ActivatedRoute,
    Router,
} from '@angular/router';
import {
    ChangeDetectorRef,
    Component,
    HostListener,
    Inject,
    PLATFORM_ID,
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
import { CmsInitService } from 'src/app/services/cms-init.service';
import {
    CommodityTypesLowerCase,
    CONSTS,
    SubjectTypeLowerCase,
} from 'src/app/app.constants';
import { CookiesService } from 'src/app/services/cookies.service';
import { OverlayService } from 'src/common/graphql/services/overlay.service';
import { SAnalyticsService } from 'src/app/services/s-analytics.service';
import { ScrollToService } from 'src/app/services/scroll-to.service';

@Component({
    templateUrl: './public-layout.component.html',
    styleUrls: ['./public-layout.component.scss'],
})
export class PublicLayoutComponent extends AbstractLayoutComponent {
    public commodityTypePower = CommodityTypesLowerCase.POWER;
    public subjectTypeIndividual = SubjectTypeLowerCase.INDIVIDUAL;
    public lastScrollTop = 0;
    public wasLastTimeScrolledToTop = false;

    @HostListener('window:scroll', [])
    onWindowScroll() {
        const scrollTop =
            window.scrollY ||
            window.pageYOffset ||
            document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0);
        this.wasLastTimeScrolledToTop = scrollTop < this.lastScrollTop && scrollTop > CONSTS.START_STICKER_HEADER ||
            scrollTop === this.lastScrollTop && this.wasLastTimeScrolledToTop;
        this.lastScrollTop = scrollTop;
    }

    constructor(
        protected apollo: Apollo,
        public authService: AuthService,
        protected cookieService: CookiesService,
        private cmsInitService: CmsInitService,
        private cd: ChangeDetectorRef,
        protected overlayService: OverlayService,
        protected route: ActivatedRoute,
        protected router: Router,
        protected sAnalyticsService: SAnalyticsService,
        protected scrollToService: ScrollToService,
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

        this.cmsInitService.publicInit();

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

    public logout = () => this.authService.logoutForced(false);
}
