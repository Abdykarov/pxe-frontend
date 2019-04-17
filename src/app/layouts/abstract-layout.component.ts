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
import { IRouterData } from './model/router-data';

export abstract class AbstractLayoutComponent extends AbstractComponent {
    public showOverlay = false;
    public toggleSubscription: Subscription;

    public routerData: IRouterData = {
        isSimpleFooter: false,
        showLogin: false,
        showSignIn: false,
        isPublic: false,
    };

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
                this.routerData = <IRouterData>this.route.snapshot.firstChild.data;
                console.log(this.routerData);
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
