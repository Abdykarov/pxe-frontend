import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import {
    ISettings,
    LoginType,
    LogoutType,
    SignType,
} from './models/router-data.model';
import { OverlayService } from 'src/common/graphql/services/overlay.service';

export abstract class AbstractLayoutComponent extends AbstractComponent {
    public showOverlay = false;
    public toggleSubscription: Subscription;

    public settings: ISettings = {
        isPublic: false,
        isSimpleFooter: false,
        loginType: LoginType.NONE,
        logoutType: LogoutType.NONE,
        signInType: SignType.NONE,
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
                this.settings = <ISettings>this.route.snapshot.firstChild.data;
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
