import {
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
import { IPersonalData } from 'src/common/graphql/models/personal-data.model';

@Component({
    selector: 'pxe-contract-form',
    templateUrl: './contract-form.component.html',
    styleUrls: ['./contract-form.component.scss'],
})
export class ContractFormComponent extends AbstractFormComponent implements OnInit, OnChanges {

    @Input()
    public personData: IPersonalData;

    public contractTemplate = `<h1>Hello word</h1>`;
    public smsSend = false;

    constructor(
        private cd: ChangeDetectorRef,
        protected fb: FormBuilder,
    ) {
        super(fb);
    }

    ngOnInit() {
        super.ngOnInit();
        this.setDisableField('smsCode');
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);
    }

    public submitForm = () => {
        this.resetCustomFieldError();
        this.triggerValidation();
        if (this.form.valid || !this.smsSend) {
            if (this.smsSend) {
            } else {
                this.resetFieldError('smsCode');
                this.setEnableField('smsCode');
                this.smsSend = true;
            }
        }
    }
}
