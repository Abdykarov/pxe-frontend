import { Injectable } from '@angular/core';
import {
    Observable,
    of,
    Subscriber,
    throwError,
} from 'rxjs';
import { catchError } from 'rxjs/operators';

// own models
import { INavigationConfig } from 'src/common/ui/navigation/models/navigation.model';
import { navigationConfig } from './navigation.config';

@Injectable({
    providedIn: 'root',
})
export class NavigationService {

    get = () => {
        const config = navigationConfig;
        return new Observable<INavigationConfig>((subscriber: Subscriber<INavigationConfig>) => subscriber.next(config));
    }

    getNavigationConfig = () => this.get()
        .pipe(catchError(error => throwError(error)))
        .subscribe(config => of(<INavigationConfig>config))
}
