import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { takeUntil } from 'rxjs/operators';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
import { IPersonalDataInputForm } from 'src/common/graphql/models/personal-data.model';

@Component({
    selector: 'pxe-supplier-profile-form',
    templateUrl: './supplier-profile-form.component.html',
    styleUrls: ['./supplier-profile-form.component.scss'],
})
export class SupplierProfileFormComponent extends AbstractFormComponent implements OnInit, OnChanges {

    @Input()
    public formValues;

    constructor(
        protected fb: FormBuilder,
    ) {
        super(fb);
    }

    ngOnInit() {
        super.ngOnInit();
        this.prefillForm();
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);
        if (changes.formValues && this.form) {
            this.prefillForm();
        }
    }

    public prefillForm = () => {
        this.form.get('companyName').setValue(this.formValues.companyName);
        this.form.get('email').setValue(this.formValues.email);
    }


    public submitValidForm = (smsCode) => {
        const form: IPersonalDataInputForm = {
            ...this.form.value,
        };
        this.submitAction.emit(form);
    }
}
