import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import * as R from 'ramda';
import { Observable, of, Subscriber, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NavigationService as NavigationApolloService } from 'src/common/graphql/services/navigation.service';
import { AuthService } from 'src/common/services/auth.service';
import {
    ILoginProvider,
    IUserTypes,
} from 'src/common/services/model/auth.model';
import {
    IMenuByUserTypeMapping,
    INavigationConfig,
    INavigationItem,
} from 'src/common/ui/navigation/models/navigation.model';
import {
    navigationMenuAdmins,
    navigationMenuAdminsActions,
    navigationMenuSuppliers,
    navigationMenuSuppliersActions,
    navigationMenuUserActions,
    navigationMenuUsers,
} from './navigation.config';

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
        const { navigationMenu, navigationMenuActions } =
            this.MENU_BY_USER_TYPE_MAPPING[currentUserType];

        return new Observable<INavigationConfig>(
            (subscriber: Subscriber<INavigationConfig>) =>
                subscriber.next([
                    R.concat(navigationMenu, navigationMenuActions),
                ])
        );
    };

    constructor(
        private apollo: Apollo,
        private authService: AuthService,
        private navigationApolloService: NavigationApolloService
    ) {}

    public getNavigationConfig = () =>
        this.get()
            .pipe(catchError((error) => throwError(error)))
            .subscribe((config: INavigationConfig) => {
                this.saveConfigToStore(config);
                return of(config);
            });

    public saveConfigToStore = (config: INavigationConfig) => {
        this.navigationApolloService.saveConfig(config).subscribe();
    };

    public filterNavigationByProvider = (
        navigationItems: INavigationItem[],
        userLoginProvider: ILoginProvider
    ) =>
        R.reject((navigationItem: INavigationItem) => {
            if (!navigationItem.allowedLoginProviders) {
                return false;
            }

            return !R.find(R.equals(userLoginProvider))(
                navigationItem.allowedLoginProviders
            );
        })(navigationItems);
}
