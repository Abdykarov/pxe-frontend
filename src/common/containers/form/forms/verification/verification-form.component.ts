import {
    Component,
    Input,
    OnChanges, SimpleChanges,
    TemplateRef,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
import { formFields } from './verification-form.config';
import { IContract } from 'src/common/graphql/models/contract';

@Component({
    selector: 'pxe-verification-form',
    templateUrl: './verification-form.component.html',
    styleUrls: ['./verification-form.component.scss'],
})
export class VerificationFormComponent extends AbstractFormComponent implements OnChanges {
    @Input()
    public smsSent: number = null;

    @Input()
    public contract: IContract;

    @Input()
    public classMainWrapper = 'row justify-content-end';

    @Input()
    public classFirstField = 'col';

    @Input()
    public classSecondField = 'col-md-auto mt-md-4';

    @Input()
    public infoTemplate: TemplateRef<any>;

    @Input()
    public labelInput = 'Kód z SMS';

    @Input()
    public submitLabelText = 'Podepsat smlouvu';

    @Input()
    public showDisabledInput = true;

    @Input()
    public showSentSmsLabelUnderFirstField = true;

    @Input()
    public sendSmsLabel = 'Odeslat SMS kód';

    @Input()
    public phone = null;

    public formFields = formFields;

    constructor(
        protected fb: FormBuilder,
    ) {
        super(fb);
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);
        if (this.form && changes.smsSent && changes.smsSent.currentValue !== changes.smsSent.previousValue) {
            this.form.reset();
            this.resetFormError(false);
        }
    }

    public submitValidForm = () => {
        this.submitAction.emit(this.form.controls.smsCode.value);
    }

    public submitSms = () => {
        this.resetFormError(false);
        this.customAction.emit();
    }
}
