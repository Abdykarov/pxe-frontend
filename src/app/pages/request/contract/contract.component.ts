import {
    ActivatedRoute,
    Router,
} from '@angular/router';
import {
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';

import {
    map,
    switchMap,
    takeUntil,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { configStepper } from './contract.config';
import { ContractService } from 'src/common/graphql/services/contract.service';
import { IFieldError } from 'src/common/containers/form/models/form-definition.model';
import { formFields } from 'src/common/containers/form/forms/contract/contract-form.config';
import { ISupplyPoint } from 'src/common/graphql/models/supply.model';
import { parseGraphQLErrors, scrollToElementFnc } from 'src/common/utils';
import { ROUTES } from 'src/app/app.constants';
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
    public fieldError: IFieldError = {};
    public formFields = formFields;
    public formLoading = false;
    public smsSent: number = null;
    public globalError: string[] = [];
    public supplyPoint: ISupplyPoint;
    public supplyPointId = this.route.snapshot.queryParams.supplyPointId;

    constructor(
        private cd: ChangeDetectorRef,
        private contractService: ContractService,
        private route: ActivatedRoute,
        private router: Router,
        private supplyService: SupplyService,
    ) {
        super();
    }

    public toggleOffer = () => {
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
            )
            .subscribe(
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

    public signContract(smsCode: string) {
        this.formLoading = true;
        this.contractService.signContract(
                this.supplyPoint.contract.contractId,
                smsCode,
            )
            .pipe(
                takeUntil(this.destroy$),
                map(({data}) => data.signContract),
            )
            .subscribe(
                (signedContract: boolean) => {
                    this.formLoading = false;
                    if (signedContract) {
                        this.router.navigate(
                            [ROUTES.ROUTER_REQUEST_PAYMENT], {
                                queryParams: {
                                    supplyPointId: this.supplyPointId,
                                },
                            });
                    } else {
                        // TODO - temporary
                        this.globalError.push('Smlouvu se nepodařilo podepsat.');
                        scrollToElementFnc('top');
                    }
                    this.cd.markForCheck();
                },
                (error) => {
                    this.formLoading = false;
                    const { globalError, fieldError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.fieldError = fieldError;
                    this.cd.markForCheck();
                },
            );
    }

    public sendContractConfirmationSms() {
        this.formLoading = true;
        this.contractService.sendContractConfirmationSms(this.supplyPoint.contract.contractId)
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(
                () => {
                    this.formLoading = false;
                    this.smsSent = new Date().getTime();
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
