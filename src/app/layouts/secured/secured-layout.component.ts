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
import { INavigationConfig } from 'src/common/ui/navigation/models/navigation.model';
import { IUi } from 'src/common/graphql/structure/root';
import { NavigationService as NavigationApolloService} from 'src/common/graphql/services/navigation.service';
import { NavigationService } from './services/navigation.service';
import { OverlayService } from 'src/common/graphql/services/overlay.service';

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
            if (event instanceof NavigationEnd && this.showOverlay) {
                this.toggleSubscription = this.overlayService.toggleOverlay(false)
                    .subscribe();
                this.toggleSubscription.unsubscribe();
            }
        });

        this.navigationService.getNavigationConfig();

        this.navigationApolloService.getConfig()
            .pipe(
                takeUntil(this.destroy$),
                map( R.path(['data', 'ui'])),
            )
            .subscribe((current: IUi)  => {
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

    public click() {
        this.overlayService.toggleOverlay()
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe();
    }
}
