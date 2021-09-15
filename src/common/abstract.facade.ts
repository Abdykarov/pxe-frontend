import {
    BehaviorSubject,
    combineLatest,
    Observable,
} from 'rxjs';

import * as R from 'ramda';

import { IFieldError } from './containers/form/models/form-definition.model';
import {map, tap} from 'rxjs/operators';

export abstract class AbstractFacade {
    public successResultSubject$: BehaviorSubject<boolean> =  new BehaviorSubject(false);
    public successResult$ = this.successResultSubject$.asObservable();

    public globalErrorSubject$: BehaviorSubject<string[]> =  new BehaviorSubject(null);
    public globalError$ = this.globalErrorSubject$.asObservable();

    public fieldErrorSubject$: BehaviorSubject<IFieldError> =  new BehaviorSubject(null);
    public fieldError$ = this.fieldErrorSubject$.asObservable();

    public isUploadingSubject$: BehaviorSubject<boolean> =  new BehaviorSubject(false);
    public isUploading$ = this.isUploadingSubject$.asObservable();

    public abstract isLoading$: Observable<boolean>;

    public createIsLoading = (observable: Observable<any>): Observable<boolean> => combineLatest([
        observable.pipe(map(R.prop('loading'))),
        this.isUploading$,
    ])
        .pipe(
            tap(console.log),
            map(([observableVal, uploading]) => !!observableVal || !!uploading),
        )
}
