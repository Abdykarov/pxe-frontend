import { Injectable } from '@angular/core';

import * as R from 'ramda';
import {
    combineLatest,
    Observable,
} from 'rxjs';
import { map } from 'rxjs/operators';

import { AbstractFacade } from 'src/common/abstract.facade';
import { ISupplierInput } from 'src/common/graphql/models/suppplier.model';
import { parseGraphQLErrors } from 'src/common/utils';
import { SupplierService } from 'src/common/graphql/services/supplier.service';

@Injectable({
    providedIn: 'root',
})
export class SupplierProfileFormFacade extends AbstractFacade {
    private findSupplierProfile$ = this.supplierService.findSupplierProfile();

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
    ) {
        super();
    }
}
