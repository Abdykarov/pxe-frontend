import { Injectable } from '@angular/core';

import { catchError } from 'rxjs/operators';
import {
    Observable,
    of,
    Subscriber,
    throwError,
} from 'rxjs';

// own models
import { Apollo } from 'apollo-angular';
import { INavigationConfig } from 'src/common/ui/navigation/models/navigation.model';
import { navigationConfig } from './navigation.config';
import * as navigation from 'src/common/graphql/mutation/navigation';

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
        .pipe(
            catchError(error => throwError(error)),
        )
        .subscribe(config => {
            this.saveConfigToStore(config);
            return of(<INavigationConfig>config);
        })

    saveConfigToStore(config: any) {
        this.apollo
            .mutate({
                mutation: navigation.loadConfig,
                variables: {
                    config: config,
                },
            })
            .subscribe();
    }
}
