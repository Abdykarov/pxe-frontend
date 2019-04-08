import { Component } from '@angular/core';
import {
    NavigationEnd,
    Router,
} from '@angular/router';

import * as R from 'ramda';
import { Apollo } from 'apollo-angular';
import {
    map,
    takeUntil,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { OverlayService } from 'src/common/graphql/services/overlay.service';

@Component({
    templateUrl: './public-layout.component.html',
    styleUrls: ['./public-layout.component.scss'],
})
export class PublicLayoutComponent extends AbstractComponent {
    public showOverlay = false;

    constructor(
        private apollo: Apollo,
        private overlayService: OverlayService,
        private router: Router,
    ) {
        super();
        this.router
            .events
            .subscribe(event => {
                if (event instanceof NavigationEnd) {
                }
            });


        this.overlayService.getOverlay()
            .pipe(
                takeUntil(this.destroy$),
                map(result => {
                        return   R.path(['data', 'ui', 'showOverlay'], result);
                    },
                ),
            )
            .subscribe(current => {
                this.showOverlay = current;
            });

    }

    public toggleOverlay() {
        this.overlayService.toggleOverlay()
        .pipe(
            takeUntil(this.destroy$),
        )
        .subscribe();
    }
}
