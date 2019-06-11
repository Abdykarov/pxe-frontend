import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';

import {
    concludeContract,
    deleteContract,
    saveContract,
    updateContract,
} from 'src/common/graphql/mutation/contract';

@Injectable({
    providedIn: 'root',
})
export class ContractService {

    constructor(
        private apollo: Apollo,
    ) {}

    public saveContract(offerId: number, supplyPointId: number) {
        return this.apollo
            .mutate({
                mutation: saveContract,
                variables: {
                    offerId,
                    supplyPointId,
                },
            });
    }

    public updateContract(contractId: number) {
        return this.apollo
            .mutate({
                mutation: updateContract,
                variables: {
                    contractId,
                },
            });
    }

    public deleteContract(contractId: number) {
        return this.apollo
            .mutate({
                mutation: deleteContract,
                variables: {
                    contractId,
                },
            });
    }

    public concludeContract(contractId: number) {
        return this.apollo
            .mutate({
                mutation: concludeContract,
                variables: {
                    contractId,
                },
            });
    }
}
