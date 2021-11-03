import {Apollo} from 'apollo-angular';
import { Injectable } from '@angular/core';



import { getPersonalDataQuery } from 'src/common/graphql/queries/personal-data';
import { getSupplyPointQuery } from 'src/common/graphql/queries/supply';
import {
    ISupplyPoint,
    ProgressStatus,
} from 'src/common/graphql/models/supply.model';
import { IPersonalDataInput } from 'src/common/graphql/models/personal-data.model';
import {
    savePersonalDataMutation,
    updatePersonalDataMutation,
} from 'src/common/graphql/mutation/personal-data';

@Injectable({
    providedIn: 'root',
})
export class PersonalDataService {

    constructor(
        private apollo: Apollo,
    ) {}

    public getPersonalData = (contractId: string) => this.apollo
        .watchQuery<any>({
            query: getPersonalDataQuery,
            variables: {
                contractId,
            },
        })
        .valueChanges

    public savePersonalData = (supplyPoint: ISupplyPoint, personalData: IPersonalDataInput) => this.apollo
        .mutate<any>({
            mutation: savePersonalDataMutation,
            variables: {
                contractId: supplyPoint.contract.contractId,
                personalData,
            },
            update: (cache, {data}) => {
                const { getSupplyPoint } = cache.readQuery(
                    {
                        query: getSupplyPointQuery,
                        variables: {
                            supplyPointId: supplyPoint.id,
                        },
                    });

                this.loadSupplyPoint(getSupplyPoint, personalData);

                cache.writeQuery({
                    query: getSupplyPointQuery,
                    data: { getSupplyPoint },
                    variables: {
                        supplyPointId: supplyPoint.id,
                    },
                });
            },
        })

    public updatePersonalData = (supplyPoint: ISupplyPoint, personalData: IPersonalDataInput) => this.apollo
        .mutate<any>({
            mutation: updatePersonalDataMutation,
            variables: {
                contractId: supplyPoint.contract.contractId,
                personalData,
            },
            // update: (cache, {data}) => {
            //     const { getSupplyPoint } = cache.readQuery(
            //         {
            //             query: getSupplyPointQuery,
            //             variables: {
            //                 supplyPointId: supplyPoint.id,
            //             },
            //         });
            //
            //     this.loadSupplyPoint(getSupplyPoint, personalData);
            //
            //     cache.writeQuery({
            //         query: getSupplyPointQuery,
            //         data: { getSupplyPoint},
            //         variables: {
            //             supplyPointId: supplyPoint.id,
            //         },
            //     });
            // },
        })

    // docasny reseni pred sync s BE
    public loadSupplyPoint = (supplyPoint: ISupplyPoint, personalData: IPersonalDataInput) => {
        // zkusit nak zautomatizovat pri pridani casche (pres funkci s argumentem typu interface? )
        // interface Foo {
        //    prop1: number;
        //    prop2: string;
        // }
        // const x = keyof Foo;
        supplyPoint.progressStatus = ProgressStatus.READY_FOR_SIGN;
        supplyPoint.contract.personalData = {
            name: personalData.name,
            birthDate: personalData.birthDate ? personalData.birthDate : '',
            ico: personalData.ico ? personalData.ico : '',
            dic: personalData.dic ? personalData.dic : '',
            address1: personalData.address1,
            address2: personalData.address2,
            email: personalData.email,
            phone: personalData.phone,
            signatoryName: personalData.signatoryName ? personalData.signatoryName : '',
            signatorySurname: personalData.signatorySurname ? personalData.signatorySurname : '',
            signatoryPosition: personalData.signatoryPosition ? personalData.signatoryPosition : '',
            bankAccountNumber: personalData.bankAccountNumber,
            bankCode: personalData.bankCode,
            depositPaymentType: {
                type: '',
                code: personalData.depositPaymentTypeId,
                description: '',
                help: '',
                __typename: 'depositPaymentType',
            },
            deposit: personalData.deposit,
            __typename: 'personalData',
        };
        supplyPoint.contract.personalData.address1.__typename = 'address1';

        if (supplyPoint.contract.personalData.address2) {
            supplyPoint.contract.personalData.address2.__typename = 'address2';
        } else {
            supplyPoint.contract.personalData.address2 = {
                street: '',
                orientationNumber: '',
                descriptiveNumber: '',
                city: '',
                postCode: '',
                region: '',
                __typename: 'address2',
            };
        }

        return supplyPoint;
    }

}
