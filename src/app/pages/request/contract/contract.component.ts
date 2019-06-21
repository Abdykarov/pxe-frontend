import { ActivatedRoute } from '@angular/router';
import {
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
} from '@angular/core';

import {
    map,
    switchMap,
    takeUntil,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { configStepper } from './contract.config';
import { ContractFormComponent } from 'src/common/containers/form/forms/contract/contract-form.component';
import { ContractService } from 'src/common/graphql/services/contract.service';
import { formFields } from 'src/common/containers/form/forms/contract/contract-form.config';
import { ISupplyPoint } from 'src/common/graphql/models/supply.model';
import { parseGraphQLErrors } from 'src/common/utils';
import { SupplyService } from 'src/common/graphql/services/supply.service';

@Component({
    selector: 'pxe-contract',
    templateUrl: './contract.component.html',
    styleUrls: ['./contract.component.scss'],
})
export class ContractComponent extends AbstractComponent implements OnInit {
    public configStepper = configStepper;
    public contractTemplate;
    public showOffer = true;

    public formFields = formFields;
    public formLoading = false;
    public formSent = false;
    public globalError: string[] = [];

    public supplyPoint: ISupplyPoint;
    public supplyPointId = this.route.snapshot.queryParams.supplyPointId;

    @ViewChild('contractForm')
    public contractForm: ContractFormComponent;

    constructor(
        private cd: ChangeDetectorRef,
        private contractService: ContractService,
        private route: ActivatedRoute,
        private supplyService: SupplyService,
    ) {
        super();
    }

    public toggleOffer = (event) => {
        this.showOffer = !this.showOffer;
    }

    ngOnInit () {
        super.ngOnInit();
        this.supplyService.getSupplyPoint(this.supplyPointId)
            .pipe(
                takeUntil(this.destroy$),
                map(({data}) => data.getSupplyPoint),
                switchMap( (supplyPoint: ISupplyPoint) => {
                    this.supplyPoint = supplyPoint;
                    return this.contractService.getContractTerms(supplyPoint.contract.contractId);
                }),
                map(({data}) => data.getContractTerms.content),
            ).subscribe(
                (content: string) => {
                    this.contractTemplate = content;
                    this.cd.markForCheck();
                },
                (error) => {
                    const { globalError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.cd.markForCheck();
                },
            );
    }

    public signContract() {
        this.contractService.signContract(
                this.supplyPoint.contract.contractId,
                this.contractForm.getFieldValue('smsCode'),
            )
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(
                () => {
                    this.formLoading = false;
                    this.formSent = true;
                    this.cd.markForCheck();
                },
                (error) => {
                    this.formLoading = false;
                    const { globalError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.cd.markForCheck();
                },
            );
    }

    public sendContractConfirmationSms() {
        this.contractService.sendContractConfirmationSms(this.supplyPoint.contract.contractId)
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(
                () => {
                    this.formLoading = false;
                    this.formSent = true;
                    this.contractForm.resetFormError();
                    this.contractForm.setEnableField('smsCode');
                    this.contractForm.smsSend = true;
                    this.cd.markForCheck();
                },
                (error) => {
                    this.formLoading = false;
                    const { globalError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.cd.markForCheck();
                },
            );
    }
}
