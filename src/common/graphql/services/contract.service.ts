import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';

import { getContractTerms } from 'src/common/graphql/queries/contract';
import {
    sendContractConfirmationSms,
    signContract,
} from 'src/common/graphql/mutation/contract';

@Injectable({
    providedIn: 'root',
})
export class ContractService {

    constructor(
        private apollo: Apollo,
    ) {}

    public getContractTerms(contractId: number) {
        return this.apollo
            .watchQuery<any>({
                query: getContractTerms,
                variables: {
                    contractId,
                },
            })
            .valueChanges;
    }

    public signContract(contractId: number, smsCode: string) {
        return this.apollo
            .mutate({
                mutation: signContract,
                variables: {
                    contractId,
                    smsCode,
                },
            });
    }

    public sendContractConfirmationSms(contractId: number) {
        return this.apollo
            .mutate({
                mutation: sendContractConfirmationSms,
                variables: {
                    contractId,
                },
            });
    }
}
