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

import * as navigationMut from 'src/common/graphql/mutation/navigation';
import * as navigation from 'src/common/graphql/queries/navigation';
import { AbstractComponent } from 'src/common/abstract.component';
import { INavigationConfig } from 'src/common/ui/navigation/models/navigation.model';
import { NavigationService } from './services/navigation.service';

@Component({
    templateUrl: './secured-layout.component.html',
})
export class SecuredLayoutComponent extends AbstractComponent {
    public navConfig: INavigationConfig = [];
    private readonly LOGOUT_URL = '/logout';

    constructor(
        private apollo: Apollo,
        private navigationService: NavigationService,
        private router: Router,
    ) {
        super();

        this.navigationService.getNavigationConfig();

        this.router
            .events
            .subscribe(event => {
                if (event instanceof NavigationEnd) {
                    console.log('SECURED LAYOUT: NAVIGATION END');
                }
            });


        this.apollo
            .watchQuery<any>({
                query: navigation.getConfig,
            })
            .valueChanges
            .pipe(
                takeUntil(this.destroy$),
                map(result =>
                    R.path(['data', 'ui', 'securedLayout', 'navigationConfig'], result),
                ),
            )
            .subscribe(current => {
                this.navConfig = current;
            });

    }

    public toggleOpenItem (navigationItem) {
        this.apollo
            .mutate({
                mutation: navigationItem.url === this.LOGOUT_URL ? navigationMut.logout : navigationMut.openItem,
                variables: {
                    item: navigationItem,
                },
            })
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe();
    }
}
