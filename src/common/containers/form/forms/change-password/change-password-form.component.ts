import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
} from '@angular/forms';

import * as R from 'ramda';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';

@Component({
    selector: 'pxe-change-password-form',
    templateUrl: './change-password-form.component.html',
    styleUrls: ['./change-password-form.component.scss'],
})
export class ChangePasswordFormComponent extends AbstractFormComponent implements OnInit, OnChanges {
    @Input()
    public isPublic = true;

    public form: FormGroup;

    constructor(
        protected fb: FormBuilder,
    ) {
        super(fb);
    }

    ngOnInit() {
        super.ngOnInit();
        this.form = this.fb.group(this.formFields.controls, this.formFields.options);
        if (this.isPublic) {
            this.setDisableField('currentPassword');
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);
        if (changes.formSent && changes.formSent.currentValue && this.form) {
            const defaultValues = R.map(R.head, this.formFields.controls);
            this.form.reset(defaultValues);
            this.resetFormError();
        }
    }
}
