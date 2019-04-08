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

import { AbstractComponent } from 'src/common/abstract.component';
import { INavigationConfig } from 'src/common/ui/navigation/models/navigation.model';
import { NavigationService as NavigationApolloService} from 'src/common/graphql/services/navigation.service';
import { NavigationService } from './services/navigation.service';
import { OverlayService } from 'src/common/graphql/services/overlay.service';

@Component({
    templateUrl: './secured-layout.component.html',
})
export class SecuredLayoutComponent extends AbstractComponent {
    public navConfig: INavigationConfig = [];
    public showOverlay = false;

    constructor(
        private apollo: Apollo,
        private navigationApolloService: NavigationApolloService,
        private navigationService: NavigationService,
        private overlayService: OverlayService,
        private router: Router,
    ) {
        super();
        this.router
            .events
            .subscribe(event => {
                if (event instanceof NavigationEnd) {
                    this.overlayService.toggleOverlay(false)
                                            .pipe(takeUntil(this.destroy$))
                                            .subscribe();
                }
            });

        this.navigationService.getNavigationConfig();

        this.router
            .events
            .subscribe(event => {
                if (event instanceof NavigationEnd) {
                }
            });


        this.navigationApolloService.getConfig()
            .pipe(
                takeUntil(this.destroy$),
                map(result => {
                      return   R.path(['data', 'ui'], result);
                    },
                ),
            )
            .subscribe(current => {
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
