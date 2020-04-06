import {
    ActivatedRoute,
    Router,
} from '@angular/router';
import {
    ChangeDetectorRef,
    Component, ElementRef,
    HostListener,
    Inject, ViewChild,
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
import { OverlayService } from 'src/common/graphql/services/overlay.service';
import { SCROLL_TO } from 'src/app/services/model/scroll-to.model';
import { ScrollToService } from 'src/app/services/scroll-to.service';

@Component({
    templateUrl: './public-layout.component.html',
    styleUrls: ['./public-layout.component.scss'],
})
export class PublicLayoutComponent extends AbstractLayoutComponent {
    public commodityTypePower = CommodityTypesLowerCase.POWER;
    public subjectTypeIndividual = SubjectTypeLowerCase.INDIVIDUAL;
    public lastScrollTop = 0;
    public wasLastTimeScrollToTop = false;

    @ViewChild('mainDiv')
    public mainDiv: ElementRef;

    constructor(
        protected apollo: Apollo,
        protected authService: AuthService,
        private cd: ChangeDetectorRef,
        protected overlayService: OverlayService,
        protected route: ActivatedRoute,
        protected router: Router,
        protected scrollToService: ScrollToService,
        @Inject(DOCUMENT) private document: any,
    ) {
        super(
            apollo,
            authService,
            overlayService,
            route,
            router,
            scrollToService,
        );

        if (this.authService.isLogged()) {
            this.authService.logoutForced();
        }

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

    @HostListener('window:scroll', [])
    onWindowScroll() {
        const scrollTop =
            window.scrollY ||
            window.pageYOffset ||
            document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0);
        this.wasLastTimeScrollToTop = scrollTop < this.lastScrollTop;
        this.lastScrollTop = scrollTop;
    }

    public supplierChange = () => this.scrollToService.scrollToLandingPageFragment(SCROLL_TO.SUPPLIER_CHANGE);

    public coverageMap = () => this.scrollToService.scrollToLandingPageFragment(SCROLL_TO.MAP_COVERAGE);
}
