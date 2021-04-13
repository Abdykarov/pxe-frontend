import { Injectable } from '@angular/core';

import * as R from 'ramda';
import { Apollo } from 'apollo-angular';
import { catchError } from 'rxjs/operators';
import {
    Observable,
    of,
    Subscriber,
    throwError,
} from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import {
    IMenuByUserTypeMapping,
    INavigationConfig,
    INavigationItem,
} from 'src/common/ui/navigation/models/navigation.model';
import {
    ILoginProvider,
    IUserTypes,
} from 'src/app/services/model/auth.model';
import {
    navigationMenuUsers,
    navigationMenuUserActions,
    navigationMenuSuppliers,
    navigationMenuSuppliersActions,
    navigationMenuAdmins,
    navigationMenuAdminsActions,
} from './navigation.config';
import { NavigationService as NavigationApolloService } from 'src/common/graphql/services/navigation.service';

@Injectable({
    providedIn: 'root',
})
export class NavigationService {

    public readonly MENU_BY_USER_TYPE_MAPPING: IMenuByUserTypeMapping = {
        [IUserTypes.CONSUMER]: {
            navigationMenu: navigationMenuUsers,
            navigationMenuActions: navigationMenuUserActions,
        },
        [IUserTypes.SUPPLIER]: {
            navigationMenu: navigationMenuSuppliers,
            navigationMenuActions: navigationMenuSuppliersActions,
        },
        [IUserTypes.CONTRACT_IMPORTER]: {
            navigationMenu: navigationMenuAdmins,
            navigationMenuActions: navigationMenuAdminsActions,
        },
    };

    get = (): Observable<INavigationConfig> => {
        const currentUserType = this.authService.currentUserValue?.type;
        const { navigationMenu, navigationMenuActions} = this.MENU_BY_USER_TYPE_MAPPING[currentUserType];

        return new Observable<INavigationConfig>((subscriber: Subscriber<INavigationConfig>) => subscriber.next([
            R.concat(navigationMenu, navigationMenuActions),
        ]));
    }

    constructor(
        private apollo: Apollo,
        private authService: AuthService,
        private navigationApolloService: NavigationApolloService,
    ) {}

    public getNavigationConfig = () => this.get()
        .pipe(
            catchError(error => throwError(error)),
        )
        .subscribe((config: INavigationConfig) => {
            this.saveConfigToStore(config);
            return of(config);
        })

    public saveConfigToStore = (config: INavigationConfig) => {
        this.navigationApolloService.saveConfig(config).subscribe();
    }

    public filterNavigationByProvider = (
        navigationItems: INavigationItem[],
        userProvider: ILoginProvider,
    ) => (
        R.reject(
            (navigationItem: INavigationItem) => {
                if (!navigationItem.allowedLoginProviders) {
                    return false;
                }

                return !R.find(
                    R.equals(userProvider),
                )(navigationItem.allowedLoginProviders);
            },
        )(navigationItems)
    )
}
