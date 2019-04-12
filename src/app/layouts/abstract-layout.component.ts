import {
    ActivatedRoute,
    NavigationEnd,
    Router,
} from '@angular/router';

import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { OverlayService } from 'src/common/graphql/services/overlay.service';

export abstract class AbstractLayoutComponent extends AbstractComponent {
    public showOverlay = false;
    public toggleSubscription: Subscription;
    public isSimpleFooter = false;

    protected constructor(
        protected apollo: Apollo,
        protected overlayService: OverlayService,
        protected route: ActivatedRoute,
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
                this.isSimpleFooter = this.route.snapshot.firstChild.data.isSimpleFooter;
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
