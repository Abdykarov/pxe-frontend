import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import * as R from 'ramda';
import {
    CODE_LIST,
    CONTRACT_END_TYPE,
    DEFAULT_QR_CODE_SETTING,
} from 'src/app/app.constants';
import { SupplyPointFormComponent } from 'src/common/containers/form/forms/supply-point/supply-point-form.component';
import {
    ContractDeleteReason,
    IQRCodeSetting,
} from 'src/common/graphql/models/contract';
import { AllowedOperations } from 'src/common/graphql/models/supply.model';
import {
    concludeContractMutation,
    confirmFirstContractViewMutation,
    deleteSelectedOfferFromContractMutation,
    deleteSignedContractMutation,
    saveContractMutation,
    sendContractConfirmationSmsMutation,
    signContractMutation,
    unsetContractProlongationMutation,
    updateContractMutation,
} from 'src/common/graphql/mutation/contract';
import { getPaymentInfoQuery } from 'src/common/graphql/queries/contract';
import { getSupplyPointQuery } from 'src/common/graphql/queries/supply';

@Injectable({
    providedIn: 'root',
})
export class ContractService {
    constructor(private apollo: Apollo) {}

    public saveContract = (offerId: string, supplyPointId: string) =>
        this.apollo.mutate<any>({
            mutation: saveContractMutation,
            variables: {
                offerId,
                supplyPointId,
            },
            // update: (cache, { data }) => {
            //     const { getSupplyPoint } = cache.readQuery(
            //         {
            //             query: getSupplyPointQuery,
            //             variables: {
            //                 supplyPointId: supplyPointId,
            //             },
            //         });
            //
            //     this.loadSupplyPointDetail(offerId, getSupplyPoint, cache, data);
            //
            //     cache.writeQuery({
            //         query: getSupplyPointQuery,
            //         data: { getSupplyPoint },
            //         variables: {
            //             supplyPointId: supplyPointId,
            //         },
            //     });
            // },
        });

    public signContract = (contractId: string, smsCode: string) =>
        this.apollo.mutate<any>({
            mutation: signContractMutation,
            variables: {
                contractId,
                smsCode,
            },
        });

    public sendContractConfirmationSms = (contractId: string) =>
        this.apollo.mutate<any>({
            mutation: sendContractConfirmationSmsMutation,
            variables: {
                contractId,
            },
        });

    public updateContract = (contractId: number) =>
        this.apollo.mutate<any>({
            mutation: updateContractMutation,
            variables: {
                contractId,
            },
        });

    public concludeContract = (contractId: number) =>
        this.apollo.mutate<any>({
            mutation: concludeContractMutation,
            variables: {
                contractId,
            },
        });

    public deleteSignedContract = (
        contractId: string,
        smsConfirmationCode: string,
        contractDeleteReason: ContractDeleteReason
    ) =>
        this.apollo.mutate<any>({
            mutation: deleteSignedContractMutation,
            variables: {
                contractId,
                smsConfirmationCode,
                contractDeleteReason,
            },
        });

    public deleteSelectedOfferFromContract = (contractId: string) =>
        this.apollo.mutate<any>({
            mutation: deleteSelectedOfferFromContractMutation,
            variables: {
                contractId,
            },
        });

    public getPaymentInfo = (
        contractId: string,
        setting: IQRCodeSetting = DEFAULT_QR_CODE_SETTING
    ) =>
        this.apollo.watchQuery<any>({
            query: getPaymentInfoQuery,
            variables: {
                contractId,
                setting,
            },
        }).valueChanges;

    public confirmFirstContractView = () =>
        this.apollo.mutate<any>({
            mutation: confirmFirstContractViewMutation,
        });

    public unsetContractProlongation = (
        supplyPointId: string,
        contractId: string,
        smsCode: string,
        supplyPointDetailForm: SupplyPointFormComponent
    ) =>
        this.apollo.mutate<any>({
            mutation: unsetContractProlongationMutation,
            variables: {
                contractId,
                smsCode,
            },
            update: (cache, { data }) => {
                const result = cache.readQuery({
                    query: getSupplyPointQuery,
                    variables: {
                        supplyPointId,
                        contractId,
                    },
                });
                const { getSupplyPoint: supplyPoint } = <any>result;
                supplyPoint.contract.prolong = false;
                supplyPoint.allowedOperations =
                    supplyPoint.allowedOperations.filter(
                        (allowedOperation: AllowedOperations) =>
                            allowedOperation !==
                            AllowedOperations.UNSET_AUTOMATIC_PROLONGATION
                    );
                supplyPoint.contractEndType = R.find(
                    R.propEq('code', CONTRACT_END_TYPE.CONTRACT_END_TERM)
                )(supplyPointDetailForm.codeLists[CODE_LIST.CONTRACT_END_TYPE]);

                cache.writeQuery({
                    query: getSupplyPointQuery,
                    data: { getSupplyPoint: { ...supplyPoint } },
                    variables: {
                        supplyPointId,
                        contractId,
                    },
                });
            },
        });
}
