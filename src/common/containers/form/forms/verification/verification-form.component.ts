import {
    Component,
    Input,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { takeUntil } from 'rxjs/operators';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
import { ContractService } from 'src/common/graphql/services/contract.service';
import { formFields } from 'src/common/containers/form/forms/verification/verification-form.config';
import { IContract } from 'src/common/graphql/models/contract';
import { parseGraphQLErrors } from 'src/common/utils';

@Component({
    selector: 'pxe-verification-form',
    templateUrl: './verification-form.component.html',
    styleUrls: ['./verification-form.component.scss'],
})
export class VerificationFormComponent extends AbstractFormComponent {

    public formFields = formFields;
    public smsSent: number = null;

    @Input()
    public contract: IContract;

    @Input()
    public classRootWrapper = 'col-12 col-lg-9 offset-lg-3';

    @Input()
    public classMainWrapper = 'row justify-content-between';

    @Input()
    public classFirstField = 'col-md-auto';

    @Input()
    public classSecondField = 'col-md-auto mt-md-4';

    @Input()
    public submitLabelText = 'Podepsat smlouvu';

    @Input()
    public showSentSmsLabelUnderFirstField = true;

    constructor(
        private contractService: ContractService,
        protected fb: FormBuilder,
    ) {
        super(fb);
    }

    public submitForm = () => {
        this.resetCustomFieldError();
        this.triggerValidation();
        if (this.form.valid) {
            this.submitAction.emit(this.form.controls.smsCode.value);
        }
    }


    public sendContractConfirmationSms() {
        this.formLoading = true;
        this.contractService.sendContractConfirmationSms(this.contract.contractId)
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(
                () => {
                    this.formLoading = false;
                    this.smsSent = new Date().getTime();
                    this.customAction.emit();
                },
                (error) => {
                    this.formLoading = false;
                    const { globalError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.customAction.emit();
                },
            );
    }

}
