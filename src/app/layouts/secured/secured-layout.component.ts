import { Component } from '@angular/core';
import {
    NavigationEnd,
    Router,
} from '@angular/router';

import * as R from 'ramda';
import { Apollo } from 'apollo-angular';
import {
    takeUntil,
    map,
} from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { AbstractComponent } from 'src/common/abstract.component';
import { environment } from 'src/environments/environment';
import { INavigationConfig } from 'src/common/ui/navigation/models/navigation.model';
import { IStoreUi } from 'src/common/graphql/models/store.model';
import { NavigationService as NavigationApolloService} from 'src/common/graphql/services/navigation.service';
import { NavigationService } from './services/navigation.service';
import { OverlayService } from 'src/common/graphql/services/overlay.service';

declare var gtag;

@Component({
    templateUrl: './secured-layout.component.html',
})
export class SecuredLayoutComponent extends AbstractComponent {
    public navConfig: INavigationConfig = [];
    public showOverlay = false;
    private toggleSubscription: Subscription;

    constructor(
        private apollo: Apollo,
        private navigationApolloService: NavigationApolloService,
        private navigationService: NavigationService,
        private overlayService: OverlayService,
        private router: Router,
    ) {
        super();

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                gtag('config', environment.gtmId, {
                    'page_path': event.urlAfterRedirects,
                });
                if (this.showOverlay) {
                    this.toggleSubscription = this.overlayService.toggleOverlay(false)
                        .subscribe();
                    this.toggleSubscription.unsubscribe();
                }
            }
        });

        this.navigationService.getNavigationConfig();

        this.navigationApolloService.getConfig()
            .pipe(
                takeUntil(this.destroy$),
                map( R.path(['data', 'ui'])),
            )
            .subscribe((current: IStoreUi)  => {
                if (current.securedLayout) {
                    this.navConfig = current.securedLayout.navigationConfig;
                    this.showOverlay = current.showOverlay;
                }
            });
    }

    public toggleOpenItem (navigationItem) {
        this.navigationApolloService.toggleOpenItem(navigationItem)
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe();
    }
}
