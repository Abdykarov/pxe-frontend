import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';

import { getConfigQuery } from 'src/common/graphql/queries/navigation';
import {
    loadConfigMutation,
    logout,
    openItemMutation,
} from 'src/common/graphql/mutation/navigation';

@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    private readonly LOGOUT_URL = '/logout';

    constructor(private apollo: Apollo) { }

    public getConfig() {
        return this.apollo
            .watchQuery<any>({
                query: getConfigQuery,
            })
            .valueChanges;
    }

    public saveConfig(config) {
        return this.apollo
            .mutate({
                mutation: loadConfigMutation,
            variables: {
                config: config,
            },
        });
    }

    public toggleNavigationItem(navigationItem) {
        return this.apollo
            .mutate({
                mutation: navigationItem.url === this.LOGOUT_URL ? logout : openItemMutation,
                variables: {
                    item: navigationItem,
                },
        });
    }
}
