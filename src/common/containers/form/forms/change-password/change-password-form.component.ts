import { Component, OnInit } from '@angular/core';
import { AbstractFormComponent } from '../../abstract-form.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'pxe-change-password-form',
    templateUrl: './change-password-form.component.html',
    styleUrls: ['./change-password-form.component.scss'],
})
export class ChangePasswordFormComponent extends AbstractFormComponent implements OnInit {
    public form: FormGroup;
    public formError: any = {};

    constructor(
        protected fb: FormBuilder,
    ) {
        super(fb);
    }

    ngOnInit() {
        super.ngOnInit();
        this.form = this.fb.group(this.formFields.controls);
    }

}
