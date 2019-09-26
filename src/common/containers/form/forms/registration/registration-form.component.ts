import {
    Component,
    Input,
    TemplateRef,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';

@Component({
    selector: 'pxe-registration-form',
    templateUrl: './registration-form.component.html',
    styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent extends AbstractFormComponent {
    @Input()
    public isSignUp = true;

    @Input()
    public lightTheme = false;

    @Input()
    public agreementTemplate: TemplateRef<any>;

    constructor(
        protected fb: FormBuilder,
    ) {
        super(fb);
    }

    public submitForm = () => {
        this.resetCustomFieldError();
        this.triggerValidation();
        if (this.form.valid) {
            const val = this.form.value;
            val.preregistration = !this.isSignUp;
            this.submitAction.emit(val);
        }
    }
}
