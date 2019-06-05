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
import { depositPaymentType } from './personal-info-form.config';
import { SubjectType } from 'src/common/graphql/models/supply.model';

@Component({
    selector: 'pxe-personal-info-form',
    templateUrl: './personal-info-form.component.html',
    styleUrls: ['./personal-info-form.component.scss'],
})
export class PersonalInfoFormComponent extends AbstractFormComponent implements OnInit, OnChanges {

    @Input()
    public subjectType = SubjectType.SUBJECT_TYPE_BUSINESSMAN;

    public depositPaymentTypeId = depositPaymentType;

    constructor(
        protected fb: FormBuilder,
    ) {
        super(fb);
    }

    ngOnInit() {
        super.ngOnInit();

        this.form.get('onlyAddress1')
            .valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe(val => {
                this.setAddress2(val);
            });

        this.setAddress2(false);
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);
    }

    public setAddress2(val) {
        const correspondenceAddress = this.form.get('address2');
        if (val) {
            correspondenceAddress.enable();
        } else {
            correspondenceAddress.disable();
        }
    }

    public submitForm = () => {
        this.resetCustomFieldError();
        this.triggerValidation();
        if (this.form.valid) {
            const form = {
                ...this.form.value,
            };
            form.phone = form.phone +  form.phonePrefix;
            delete form.phonePrefix;
            delete form.onlyAddress1;
            this.submitAction.emit(form);
        }
    }
}
