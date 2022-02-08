import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ContractActions } from 'src/app/pages/consumers/supply-points-overview/models/supply-point-detail.model';

@Injectable()
export class ContractActionsService {
    public activeContractActionSubject$ = new BehaviorSubject<ContractActions>(
        ContractActions.NONE
    );

    public changeActiveContractAction(contractActions: ContractActions): void {
        this.activeContractActionSubject$.next(contractActions);
    }

    public getValue(): ContractActions {
        return this.activeContractActionSubject$.getValue();
    }
}
