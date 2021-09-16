import * as R from 'ramda';
import {
    BehaviorSubject,
    combineLatest,
    Observable,
    of,
} from 'rxjs';
import {
    catchError,
    map,
} from 'rxjs/operators';

import { IFieldError } from './containers/form/models/form-definition.model';
import { parseGraphQLErrors } from './utils';
import {ErrorResponse} from 'apollo-link-error';

export abstract class AbstractFacade {
    public successResultSubject$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public successResult$ = this.successResultSubject$.asObservable();

    public globalErrorSubject$: BehaviorSubject<string[]> = new BehaviorSubject(null);
    public globalError$ = this.globalErrorSubject$.asObservable();

    public fieldErrorSubject$: BehaviorSubject<IFieldError> = new BehaviorSubject(null);
    public fieldError$ = this.fieldErrorSubject$.asObservable();

    public isUploadingSubject$: BehaviorSubject<boolean> =  new BehaviorSubject(false);
    public isUploading$ = this.isUploadingSubject$.asObservable();

    public abstract isLoading$: Observable<boolean>;

    public catchError = catchError((error: ErrorResponse) => {
        this.processError(error);
        return of(null);
    });

    public processError = (error: ErrorResponse): void => {
        const { globalError, fieldError } = parseGraphQLErrors(error);
        this.globalErrorSubject$.next(globalError);
        this.fieldErrorSubject$.next(fieldError);
        this.isUploadingSubject$.next(false);
    }

    public createIsLoading = (observable: Observable<any>): Observable<boolean> => combineLatest([
        observable.pipe(map(R.prop('loading'))),
        this.isUploading$,
    ])
        .pipe(
            map(([observableVal, uploading]) => !!observableVal || !!uploading),
        )
}
