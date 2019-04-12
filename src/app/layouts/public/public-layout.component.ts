import { Component } from '@angular/core';
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
import { OverlayService } from 'src/common/graphql/services/overlay.service';

@Component({
    templateUrl: './public-layout.component.html',
    styleUrls: ['./public-layout.component.scss'],
})
export class PublicLayoutComponent extends AbstractLayoutComponent {

    constructor(
        protected route: ActivatedRoute,
        protected apollo: Apollo,
        protected overlayService: OverlayService,
        protected router: Router,
    ) {
        super(
            apollo,
            overlayService,
            route,
            router,
        );

        this.overlayService.getOverlay()
            .pipe(
                takeUntil(this.destroy$),
                map(R.path(['data', 'ui', 'showOverlay'])),
            )
            .subscribe((current: boolean) => {
                this.showOverlay = current;
            });
    }
}
