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
import { INavigationConfig } from 'src/common/ui/navigation/models/navigation.model';
import {
    navigationMenuUsers,
    navigationMenuUserActions,
    navigationMenuSuppliers,
    navigationMenuSuppliersActions,
} from './navigation.config';
import { NavigationService as NavigationApolloService } from 'src/common/graphql/services/navigation.service';

@Injectable({
    providedIn: 'root',
})
export class NavigationService {

    get = (): Observable<INavigationConfig> => {
        const currentUser = this.authService.currentUserValue;
        const navigationMenu = currentUser && currentUser.supplier ? navigationMenuSuppliers : navigationMenuUsers;
        const navigationMenuActions = currentUser && currentUser.supplier ? navigationMenuSuppliersActions : navigationMenuUserActions;

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
}
