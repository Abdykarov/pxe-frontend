import {
    ChangeDetectorRef,
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { takeUntil } from 'rxjs/operators';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
import { ContractService } from 'src/common/graphql/services/contract.service';
import { IPersonalData } from 'src/common/graphql/models/personal-data.model';
import { parseGraphQLErrors } from 'src/common/utils';

@Component({
    selector: 'pxe-contract-form',
    templateUrl: './contract-form.component.html',
    styleUrls: ['./contract-form.component.scss'],
})
export class ContractFormComponent extends AbstractFormComponent implements OnInit, OnChanges {

    @Input()
    public personData: IPersonalData;

    @Input()
    public contractTemplate;

    public smsSend = false;

    constructor(
        private cd: ChangeDetectorRef,
        private contractService: ContractService,
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
                this.signContract();
            } else {
                this.sendContractConfirmationSms();
            }
        }
    }

    public signContract() {
        this.contractService.signContract(1, this.getFieldValue('smsCode'))
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe((data) => {
                    this.formLoading = false;
                    this.formSent = true;
                    this.cd.markForCheck();
                },
                (error) => {
                    this.formLoading = false;
                    const { fieldError, globalError } = parseGraphQLErrors(error);
                    this.fieldError = fieldError;
                    this.globalError = globalError;
                    this.cd.markForCheck();
                });
    }

    public sendContractConfirmationSms() {
        this.contractService.sendContractConfirmationSms(1)
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(
                (data) => {
                    this.formLoading = false;
                    this.formSent = true;
                    this.resetFormError();
                    this.setEnableField('smsCode');
                    this.smsSend = true;
                    this.cd.markForCheck();
                },
                (error) => {
                    this.formLoading = false;
                    const { fieldError, globalError } = parseGraphQLErrors(error);
                    this.fieldError = fieldError;
                    this.globalError = globalError;
                    this.cd.markForCheck();
                },
            );
    }

    public sendSms(evt) {
        this.sendContractConfirmationSms();
    }
}
