import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
    IContractsBasedOnOffersFilter,
    ISupplierInput,
} from 'src/common/graphql/models/suppplier.model';
import {
    findSupplierProfileQuery,
    listSupplierContractsBasedOnOffersQuery,
} from 'src/common/graphql/queries/supplier';
import { updateSupplierProfileMutation } from '../mutation/supplier';

@Injectable({
    providedIn: 'root',
})
export class SupplierService {
    constructor(private apollo: Apollo) {}

    public getListSupplierContractsBasedOnOffers = (
        contractsBasedOnOffersFilter: IContractsBasedOnOffersFilter
    ) =>
        this.apollo.watchQuery<any>({
            query: listSupplierContractsBasedOnOffersQuery,
            variables: {
                filter: {
                    ...contractsBasedOnOffersFilter,
                },
            },
            fetchPolicy: 'network-only',
        }).valueChanges;

    public findSupplierProfile = () =>
        this.apollo.watchQuery<any>({
            query: findSupplierProfileQuery,
            fetchPolicy: 'network-only',
            useInitialLoading: true,
        }).valueChanges;

    public updateSupplierProfile = (supplierInput: ISupplierInput) =>
        this.apollo.mutate<any>({
            mutation: updateSupplierProfileMutation,
            variables: {
                supplierInput,
            },
            awaitRefetchQueries: true,
            refetchQueries: [
                {
                    query: findSupplierProfileQuery,
                },
            ],
        });
}
