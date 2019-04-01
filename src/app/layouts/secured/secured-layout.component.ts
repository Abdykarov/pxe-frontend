import { Component } from '@angular/core';
import {
    Router,
    NavigationEnd,
} from '@angular/router';

import { NavigationService } from './services/navigation.service';
import {Apollo} from 'apollo-angular';
import * as navigation from '../../../common/graphql/queries/navigation';
import {map, takeUntil} from 'rxjs/operators';
import {AbstractComponent} from '../../../common/abstract.component';
import * as navigationMut from '../../../common/graphql/mutation/navigation';
import {INavigationConfig} from '../../../common/ui/navigation/models/navigation.model';


@Component({
    templateUrl: './secured-layout.component.html',
})
export class SecuredLayoutComponent extends AbstractComponent {
    public navConfig: INavigationConfig = [];
    private readonly LOGOUT_URL = '/logout';

    constructor(
        private navigationService: NavigationService,
        private router: Router,
        private apollo: Apollo,
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
                map(result => {
                        return result && result.data && result.data.ui && result.data.ui.securedLayout
                            && result.data.ui.securedLayout.navigationConfig;
                    },
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
            .subscribe( param => {});
    }
}
