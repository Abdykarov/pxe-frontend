import {
    ActivatedRoute,
    Router,
} from '@angular/router';
import {
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';

import * as R from 'ramda';
import {
    map,
    takeUntil,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import {
    AllowedOperations,
    CommodityType,
    ISupplyPoint,
    ISupplyPointFormData,
    ISupplyPointGasAttributes,
    ISupplyPointPowerAttributes,
} from 'src/common/graphql/models/supply.model';
import { ContractService } from 'src/common/graphql/services/contract.service';
import { formFields } from 'src/common/containers/form/forms/supply-point/supply-point-form.config';
import { graphQLMessages } from 'src/common/constants/errors.constant';
import { IFieldError } from 'src/common/containers/form/models/form-definition.model';
import {
    parseGraphQLErrors,
    scrollToElementFnc,
} from 'src/common/utils';
import { ROUTES } from 'src/app/app.constants';
import { SupplyService } from 'src/common/graphql/services/supply.service';
import { ContractActions } from '../models/supply-point-detail.model';

@Component({
    templateUrl: './supply-point-detail.component.html',
    styleUrls: ['./supply-point-detail.component.scss'],
})
export class SupplyPointDetailComponent extends AbstractComponent implements OnInit {
    public allowedOperations = AllowedOperations;
    public dataLoading = true;
    public fieldError: IFieldError = {};
    public formFields = formFields;
    public formLoading = false;
    public formSent = false;
    public globalError: string[] = [];
    public smsSent: number = null;
    public supplyPoint: ISupplyPoint = null;
    public supplyPointId = this.route.snapshot.params.supplyPointId;
    public contractAction: ContractActions = ContractActions.NONE;
    public contractActions = ContractActions;

    constructor(
        private cd: ChangeDetectorRef,
        private contractService: ContractService,
        private route: ActivatedRoute,
        private router: Router,
        private supplyService: SupplyService,
    ) {
        super();
    }

    ngOnInit() {
        this.supplyService.getSupplyPoint(this.supplyPointId)
            .pipe(
                takeUntil(this.destroy$),
                map(({data}) => data.getSupplyPoint),
            )
            .subscribe(
                (supplyPoint: ISupplyPoint) => {
                    this.supplyPoint = supplyPoint;
                    this.dataLoading = false;
                    this.cd.markForCheck();
                },
                (error) => {
                    this.dataLoading = false;
                    const { globalError } = parseGraphQLErrors(error);
                    this.globalError = globalError;
                    this.cd.markForCheck();
                });
    }

    public updateSupplyForm = (supplyPointFormData: ISupplyPointFormData) => {
        this.formLoading = true;
        this.formSent = false;
        this.globalError = [];
        this.fieldError = {};
        let updateSupplyPoint;

        const supplyPoint: ISupplyPoint = R.pick([
            'name',
        ], supplyPointFormData);

        if (supplyPointFormData.commodityType === CommodityType.POWER) {
            const powerAttributes: ISupplyPointPowerAttributes =
                R.pick([
                    'annualConsumptionNT',
                    'annualConsumptionVT',
                ], supplyPointFormData);
            updateSupplyPoint = this.supplyService.updatePowerSupplyPointWithContract(supplyPointFormData.id, supplyPoint, powerAttributes);
        } else {
            const gasAttributes: ISupplyPointGasAttributes =
                R.pick([
                    'annualConsumption',
                ], supplyPointFormData);
            updateSupplyPoint = this.supplyService.updateGasSupplyPointWithContract(supplyPointFormData.id, supplyPoint, gasAttributes);
        }

        updateSupplyPoint
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(
                () => {
                    this.formLoading = false;
                    this.formSent = true;
                    scrollToElementFnc('top');
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

    public cancelUpdate = () => {
        this.router.navigate([ROUTES.ROUTER_SUPPLY_POINTS]);
    }

    public sendContractConfirmationSms = () => {
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

    public submitVerification = (smsCode: string) => {
        this.formLoading = true;
        this.globalError = [];
        this.contractService.deleteSignedContract(this.supplyPoint.contract.contractId, smsCode)
            .pipe(
                takeUntil(
                    this.destroy$,
                ),
                map(({data}) => data.deleteSignedContract),
            ).subscribe(
            (deleteSignedContract: boolean) => {
                this.formLoading = false;
                if (deleteSignedContract) {
                    // TODO - navigate to REQUESTS overview
                    this.router.navigate([ROUTES.ROUTER_REQUESTS]);
                } else {
                    // TODO - temporary
                    this.globalError.push(graphQLMessages.cannotDeleteContract);
                    scrollToElementFnc('top');
                }
            },
            (error) => {
                this.formLoading = false;
                const { globalError } = parseGraphQLErrors(error);
                this.globalError = globalError;
                this.cd.markForCheck();
            },
        );
        this.cd.markForCheck();
    }

    public leaveContract = () => {
        this.contractAction = ContractActions.LEAVE_CONTRACT;
        this.smsSent = null;
    }

    public terminateContract = () => {
        this.contractAction = ContractActions.TERMINATE_CONTRACT;
        this.smsSent = null;
    }
}
