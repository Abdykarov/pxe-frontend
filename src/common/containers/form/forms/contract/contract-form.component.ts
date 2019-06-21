import {
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
import { IPersonalData } from 'src/common/graphql/models/personal-data.model';

@Component({
    selector: 'pxe-contract-form',
    templateUrl: './contract-form.component.html',
    styleUrls: ['./contract-form.component.scss'],
})
export class ContractFormComponent extends AbstractFormComponent implements OnInit {

    @Input()
    public personData: IPersonalData;

    @Input()
    public contractTemplate;

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

    public submitForm = () => {
        this.resetCustomFieldError();
        this.triggerValidation();
        if (this.form.valid || !this.smsSend) {
            if (this.smsSend) {
                this.submitAction.emit();
            } else {
                this.customAction.emit();
            }
        }
    }
}
