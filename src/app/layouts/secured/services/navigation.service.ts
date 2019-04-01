import { Injectable } from '@angular/core';
import {
    Observable,
    of,
    Subscriber,
    throwError,
} from 'rxjs';
import {catchError, map, takeUntil} from 'rxjs/operators';

// own models
import { INavigationConfig } from 'src/common/ui/navigation/models/navigation.model';
import { navigationConfig } from './navigation.config';
import {Apollo} from 'apollo-angular';
import * as navigationQuery from '../../../../common/graphql/queries/navigation';
import * as navigationMut from '../../../../common/graphql/mutation/navigation';

@Injectable({
    providedIn: 'root',
})
export class NavigationService {

    get = () => {
        const config = navigationConfig;
        return new Observable<INavigationConfig>((subscriber: Subscriber<INavigationConfig>) => subscriber.next(config));
    }

    constructor(private apollo: Apollo) {}


    getNavigationConfig = () => this.get()
        .pipe(catchError(error => throwError(error)))
        .subscribe(config => {
            this.saveConfigToStore(config);
            return of(<INavigationConfig>config);
        })

    saveConfigToStore(config: any) {
        this.apollo
            .mutate({
                mutation: navigationMut.loadConfig,
                variables: {
                    config: config,
                },
            })
            .subscribe( param => {
                return param;
            });
    }

}
