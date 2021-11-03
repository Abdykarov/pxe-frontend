import {Apollo} from 'apollo-angular';
import { Injectable } from '@angular/core';



import { getConfigQuery } from 'src/common/graphql/queries/navigation';
import { INavigationConfig } from 'src/common/ui/navigation/models/navigation.model';
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

    public getConfig = () => this.apollo
        .watchQuery<any>({
            query: getConfigQuery,
        })
        .valueChanges

    public saveConfig = (config: INavigationConfig) => this.apollo
        .mutate<any>({
            mutation: loadConfigMutation,
            variables: {
                config,
            },
        })

    public toggleNavigationItem = (navigationItem) => this.apollo
        .mutate<any>({
            mutation: navigationItem.url === this.LOGOUT_URL ? logout : openItemMutation,
            variables: {
                item: navigationItem,
            },
        })
}
