import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';
import { catchError } from 'rxjs/operators';
import {
    Observable,
    of,
    Subscriber,
    throwError,
} from 'rxjs';

// own models
import { AuthService } from 'src/app/services/auth.service';
import { INavigationConfig } from 'src/common/ui/navigation/models/navigation.model';
import {
    navigationConfigUser,
    navigationConfigSupplier,
} from './navigation.config';
import { NavigationService as NavigationApolloService } from 'src/common/graphql/services/navigation.service';

@Injectable({
    providedIn: 'root',
})
export class NavigationService {

    get = () => {
        const currentUser = this.authService.currentUserValue;
        const config = currentUser.supplier ? navigationConfigSupplier : navigationConfigUser ;
        return new Observable<INavigationConfig>((subscriber: Subscriber<INavigationConfig>) => subscriber.next(config));
    }

    constructor(
        private apollo: Apollo,
        private authService: AuthService,
        private navigationApolloService: NavigationApolloService,
    ) {}

    getNavigationConfig = () => this.get()
        .pipe(
            catchError(error => throwError(error)),
        )
        .subscribe(config => {
            this.saveConfigToStore(config);
            return of(<INavigationConfig>config);
        })

    saveConfigToStore(config: any) {
        this.navigationApolloService.saveConfig(config).subscribe();
    }
}
