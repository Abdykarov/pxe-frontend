import { Injectable } from '@angular/core';

import * as R from 'ramda';
import {
    BehaviorSubject,
    combineLatest,
    Observable,
} from 'rxjs';
import { map } from 'rxjs/operators';

import { IFieldError } from 'src/common/containers/form/models/form-definition.model';
import { ISupplierInput } from 'src/common/graphql/models/suppplier.model';
import { parseGraphQLErrors } from 'src/common/utils';
import { SupplierService } from 'src/common/graphql/services/supplier.service';

@Injectable({
    providedIn: 'root',
})
export class SupplierProfileFormFacade {
    private findSupplierProfile$ = this.supplierService.findSupplierProfile();

    public successResultSubject$: BehaviorSubject<boolean> =  new BehaviorSubject(false);
    public successResult$ = this.successResultSubject$.asObservable();

    public globalErrorSubject$: BehaviorSubject<string[]> =  new BehaviorSubject(null);
    public globalError$ = this.globalErrorSubject$.asObservable();

    public fieldErrorSubject$: BehaviorSubject<IFieldError> =  new BehaviorSubject(null);
    public fieldError$ = this.fieldErrorSubject$.asObservable();

    public isUploadingSubject$: BehaviorSubject<boolean> =  new BehaviorSubject(false);
    public isUploading$ = this.isUploadingSubject$.asObservable();

    public isLoading$: Observable<boolean> = combineLatest([
        this.findSupplierProfile$.pipe(map(R.prop('loading'))),
        this.isUploading$,
    ])
    .pipe(
        map(([findingSupplierProfile, uploading]) => !!findingSupplierProfile || !!uploading),
    );

    public findSupplierProfileData$ =
        this.findSupplierProfile$.pipe(map(({data}) => data?.findSupplierProfile));


    public updateSupplierProfile = (supplyInput: ISupplierInput) => {
        this.resetState();
        this.isUploadingSubject$.next(true);
        this.supplierService.updateSupplierProfile(supplyInput)
            .subscribe(
                () => this.successResultSubject$.next(true),
                error => {
                    const { globalError, fieldError } = parseGraphQLErrors(error);
                    this.globalErrorSubject$.next(globalError);
                    this.fieldErrorSubject$.next(fieldError);
                    this.isUploadingSubject$.next(false);
                },
                () => this.isUploadingSubject$.next(false),
            );
    }

    public resetState = (): void => {
        this.isUploadingSubject$.next(false);
        this.globalErrorSubject$.next([]);
        this.fieldErrorSubject$.next(null);
        this.successResultSubject$.next(false);
    }

    constructor(
        private supplierService: SupplierService,
    ) {}
}
