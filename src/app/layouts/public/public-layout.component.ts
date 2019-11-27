import {
    ActivatedRoute,
    Router,
} from '@angular/router';
import {
    ChangeDetectorRef,
    Component,
} from '@angular/core';

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

    constructor(
        protected apollo: Apollo,
        protected authService: AuthService,
        private cd: ChangeDetectorRef,
        protected overlayService: OverlayService,
        protected route: ActivatedRoute,
        protected router: Router,
        protected scrollToService: ScrollToService,
    ) {
        super(
            apollo,
            authService,
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
                this.showOverlay = current;
                this.cd.markForCheck();
            });
    }

    public supplierChange = () => this.scrollToService.scrollToLandingPageFragment(SCROLL_TO.SUPPLIER_CHANGE);

    public coverageMap = () => this.scrollToService.scrollToLandingPageFragment(SCROLL_TO.MAP_COVERAGE);
}
