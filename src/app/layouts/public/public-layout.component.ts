import { ChangeDetectorRef, Component } from '@angular/core';
import {
    ActivatedRoute,
    Router,
} from '@angular/router';

import * as R from 'ramda';
import { Apollo } from 'apollo-angular';
import {
    map,
    takeUntil,
} from 'rxjs/operators';

import { AbstractLayoutComponent } from 'src/app/layouts/abstract-layout.component';
import { AuthService } from 'src/app/services/auth.service';
import { OverlayService } from 'src/common/graphql/services/overlay.service';
import { ScrollToService } from 'src/app/services/scroll-to.service';
import { SCROLL_TO } from 'src/app/services/model/scroll-to.model';

@Component({
    templateUrl: './public-layout.component.html',
    styleUrls: ['./public-layout.component.scss'],
})
export class PublicLayoutComponent extends AbstractLayoutComponent {
    constructor(
        protected apollo: Apollo,
        protected authService: AuthService,
        protected cd: ChangeDetectorRef,
        protected overlayService: OverlayService,
        protected route: ActivatedRoute,
        protected router: Router,
        protected scrollToService: ScrollToService,
    ) {
        super(
            apollo,
            authService,
            cd,
            overlayService,
            route,
            router,
            scrollToService,
        );

        this.overlayService.getOverlay()
            .pipe(
                takeUntil(this.destroy$),
                map(R.path(['data', 'ui', 'showOverlay'])),
            )
            .subscribe((current: boolean) => {
                console.log('%c ***** OVERLAY *****', 'background: #bada55; color: #000; font-weight: bold', current);
                this.showOverlay = current;
                this.cd.markForCheck();
            });
    }

    public supplierChange = () => this.scrollToService.scrollToLandingPageFragment(SCROLL_TO.SUPPLIER_CHANGE);

    public coverageMap = () => {
        console.log('%c ***** coverageMap *****', 'background: #bada55; color: #000; font-weight: bold');
        this.scrollToService.scrollToLandingPageFragment(SCROLL_TO.MAP_COVERAGE);
    }
}
