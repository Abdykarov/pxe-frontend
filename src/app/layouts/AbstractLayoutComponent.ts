import {
    NavigationEnd,
    Router,
} from '@angular/router';
import {
    OnInit,
    OnDestroy,
} from '@angular/core';

import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { OverlayService } from 'src/common/graphql/services/overlay.service';

export abstract class AbstractLayoutComponent extends AbstractComponent implements OnInit, OnDestroy {
    public showOverlay = false;
    public toggleSubscription: Subscription;

    protected constructor(
        protected apollo: Apollo,
        protected overlayService: OverlayService,
        protected router: Router,
    ) {
        super();
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                if (this.showOverlay) {
                    this.toggleSubscription = this.overlayService.toggleOverlay(false)
                        .subscribe();
                    this.toggleSubscription.unsubscribe();
                }
            }
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
