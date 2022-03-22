import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CONSTS, RequestsOverviewBannerShow } from 'src/app/app.constants';
import { ContractActions } from 'src/app/pages/consumers/supply-points-overview/models/supply-point-detail.model';
import { NavigateConsumerService } from 'src/app/services/navigate-consumer.service';
import { defaultErrorMessage } from 'src/common/constants/errors.constant';
import { SupplyPointFormComponent } from 'src/common/containers/form/forms/supply-point/supply-point-form.component';
import { ContractActionsService } from 'src/common/containers/supply-point-detail/services/contract-actions.service';
import { ContractDeleteReason } from 'src/common/graphql/models/contract';
import { ISupplyPoint } from 'src/common/graphql/models/supply.model';
import { ContractService } from 'src/common/graphql/services/contract.service';
import { scrollToElementFnc } from 'src/common/utils';

@Injectable()
export class VerificationFactoryService {
    constructor(
        private contractActionsService: ContractActionsService,
        private contractService: ContractService,
        private navigateConsumerService: NavigateConsumerService,
        private router: Router
    ) {}

    public verificationFactory(
        smsCode: string,
        supplyPoint: ISupplyPoint,
        supplyPointDetailForm: SupplyPointFormComponent
    ): Observable<any> {
        switch (this.contractActionsService.getValue()) {
            case ContractActions.UNSET_PROLONGATION:
                return this.createUnsetContractProlongation(
                    smsCode,
                    supplyPoint,
                    supplyPointDetailForm
                );
            case ContractActions.TERMINATE_CONTRACT:
            case ContractActions.LEAVE_CONTRACT:
                return this.createDeleteSignedContract(smsCode, supplyPoint);
            default:
                throw 'Bad active contract action';
        }
    }

    private createDeleteSignedContract(
        smsCode,
        supplyPoint: ISupplyPoint
    ): Observable<any> {
        return this.contractService
            .deleteSignedContract(
                supplyPoint.contract?.contractId,
                smsCode,
                this.contractActionsService.getValue()
                    ? ContractDeleteReason.LEAVING
                    : ContractDeleteReason.TERMINATION
            )
            .pipe(map(({ data }) => data.deleteSignedContract));
    }

    private createUnsetContractProlongation(
        smsCode,
        supplyPoint: ISupplyPoint,
        supplyPointDetailForm: SupplyPointFormComponent
    ): Observable<any> {
        return this.contractService
            .unsetContractProlongation(
                supplyPoint.id,
                supplyPoint.contract.contractId,
                smsCode,
                supplyPointDetailForm
            )
            .pipe(map(({ data }) => data.unsetContractProlongation));
    }

    public processSuccessVerificationResult(
        result: boolean,
        globalErrorSubject$: BehaviorSubject<string[]>,
        formSent$: BehaviorSubject<boolean>,
        smsSentSubject$: BehaviorSubject<number>
    ): void {
        switch (this.contractActionsService.getValue()) {
            case ContractActions.UNSET_PROLONGATION:
                this.processSuccessVerificationResultUnsetContractProlongation(
                    result,
                    globalErrorSubject$,
                    formSent$,
                    smsSentSubject$
                );
                break;
            case ContractActions.TERMINATE_CONTRACT:
            case ContractActions.LEAVE_CONTRACT:
                this.processSuccessVerificationResultDeleteSignedContract(
                    result,
                    globalErrorSubject$
                );
                break;
            default:
                throw 'Bad active contract action';
        }
    }

    private processSuccessVerificationResultDeleteSignedContract(
        deleteSignedContract: boolean,
        globalErrorSubject$: BehaviorSubject<string[]>
    ): void {
        if (deleteSignedContract) {
            this.navigateConsumerService.navigateToRequests({
                state: {
                    requestsOverviewBannerShow:
                        this.contractActionsService.getValue() ===
                        ContractActions.LEAVE_CONTRACT
                            ? RequestsOverviewBannerShow.LEAVE_CONTRACT
                            : RequestsOverviewBannerShow.TERMINATE_CONTRACT,
                },
            });
        } else {
            globalErrorSubject$.next([defaultErrorMessage]);
        }
    }

    private processSuccessVerificationResultUnsetContractProlongation(
        unsetContractProlongation: boolean,
        globalErrorSubject$: BehaviorSubject<string[]>,
        formSent$: BehaviorSubject<boolean>,
        smsSentSubject$: BehaviorSubject<number>
    ): void {
        if (unsetContractProlongation) {
            formSent$.next(true);
            setTimeout(() => {
                formSent$.next(false);
            }, CONSTS.TIME_TO_SHOW_FLASH_MESSAGES);
            globalErrorSubject$.next([]);
            smsSentSubject$.next(null);
            this.contractActionsService.changeActiveContractAction(
                ContractActions.NONE
            );
            scrollToElementFnc('top');
        } else {
            globalErrorSubject$.next([defaultErrorMessage]);
        }
    }
}
