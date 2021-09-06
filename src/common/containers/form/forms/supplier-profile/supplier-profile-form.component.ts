import {
    Component,
    OnChanges,
    OnInit,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';

import * as R from 'ramda';
import {
    filter,
    takeUntil,
} from 'rxjs/operators';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
import { supplierProfileFormFields } from './supplier-profile-form.config';
import { SupplierProfileFormFacade } from './supplier-profile-form-facade.service';

@Component({
    selector: 'pxe-supplier-profile-form',
    templateUrl: './supplier-profile-form.component.html',
    styleUrls: ['./supplier-profile-form.component.scss'],
})
export class SupplierProfileFormComponent extends AbstractFormComponent implements OnInit, OnChanges {
    public readonly successResult$ = this.supplierProfileFormFacade.successResult$;
    public readonly isLoading$ = this.supplierProfileFormFacade.isLoading$;
    public readonly fieldError$ = this.supplierProfileFormFacade.fieldError$;
    public readonly globalError$ = this.supplierProfileFormFacade.globalError$;

    public readonly formFields = supplierProfileFormFields;

    constructor(
        public supplierProfileFormFacade: SupplierProfileFormFacade,
        protected fb: FormBuilder,
    ) {
        super(fb);
        this.supplierProfileFormFacade.resetState();
    }

    ngOnInit() {
        super.ngOnInit();
        this.supplierProfileFormFacade.findSupplierProfileData$
            .pipe(
                takeUntil(this.destroy$),
                filter(data => !R.isNil(data)),
            ).subscribe(this.prefillFormWithSameKeys);
    }

    public submitValidForm = () => this.supplierProfileFormFacade.updateSupplierProfile(this.form.value);
}
