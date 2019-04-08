import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';

import * as navigation from '../queries/navigation';
import * as navigationMut from '../mutation/navigation';
import { toggleOverlay } from 'src/common/graphql/mutation/navigation';

@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    private readonly LOGOUT_URL = '/logout';

    constructor(private apollo: Apollo) { }

    public getConfig() {
        return  this.apollo
                    .watchQuery<any>({
                        query: navigation.getConfig,
                    })
                    .valueChanges;
    }

    public saveConfig(config) {
        return this.apollo
                    .mutate({
                        mutation: navigationMut.loadConfig,
                    variables: {
                        config: config,
                    },
        });
    }

    public toggleOpenItem(navigationItem) {
        return this.apollo
                    .mutate({
                        mutation: navigationItem.url === this.LOGOUT_URL ? navigationMut.logout : navigationMut.openItem,
                        variables: {
                            item: navigationItem,
                        },
                    });
    }
}
