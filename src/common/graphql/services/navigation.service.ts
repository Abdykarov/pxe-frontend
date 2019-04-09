import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';

import { getConfig } from 'src/common/graphql/queries/navigation';
import {
    loadConfig,
    logout,
    openItem,
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
                query: getConfig,
            })
            .valueChanges;
    }

    public saveConfig(config) {
        return this.apollo
            .mutate({
                mutation: loadConfig,
            variables: {
                config: config,
            },
        });
    }

    public toggleOpenItem(navigationItem) {
        return this.apollo
            .mutate({
                mutation: navigationItem.url === this.LOGOUT_URL ? logout : openItem,
                variables: {
                    item: navigationItem,
                },
        });
    }
}
