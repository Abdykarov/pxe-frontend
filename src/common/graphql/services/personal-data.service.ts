import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';

import { getPersonalData } from 'src/common/graphql/queries/personal-data';
import { getSupplyPoint } from 'src/common/graphql/queries/supply';
import { ISupplyPoint } from 'src/common/graphql/models/supply.model';
import { IPersonalDataInput } from 'src/common/graphql/models/personal-data.model';
import { savePersonalData } from 'src/common/graphql/mutation/personal-data';

@Injectable({
    providedIn: 'root',
})
export class PersonalDataService {

    constructor(
        private apollo: Apollo,
    ) {}

    public getPersonalData(contractId: string) {
        return this.apollo
            .watchQuery<any>({
                query: getPersonalData,
                variables: {
                    contractId,
                },
            })
            .valueChanges;
    }

    public savePersonalData(supplyPointOld: ISupplyPoint, personalData: IPersonalDataInput) {
        return this.apollo
            .mutate({
                mutation: savePersonalData,
                variables: {
                    contractId: supplyPointOld.contract.contractId,
                    personalData,
                },
                update: (cache, {data}) => {
                    const getSupplyPointResult: {
                        getSupplyPoint: ISupplyPoint
                    } = cache.readQuery(
                        {
                            query: getSupplyPoint,
                            variables: {
                                supplyPointId: supplyPointOld.id,
                            },
                        });

                    const supplyPoint: ISupplyPoint = getSupplyPointResult.getSupplyPoint;
                    this.loadSupplyPoint(supplyPoint, personalData);

                    cache.writeQuery({
                        query: getSupplyPoint,
                        data: { getSupplyPoint: supplyPoint},
                        variables: {
                            supplyPointId: supplyPointOld.id,
                        },
                    });
                },
            });
    }

    // docasny reseni pred sync s BE
    public loadSupplyPoint = (supplyPoint: ISupplyPoint, personalData: IPersonalDataInput) => {
        supplyPoint.contract.personalData = {
            name: personalData.name,
            ico: personalData.ico ? personalData.ico : '',
            dic: personalData.dic ? personalData.dic : '',
            address1: personalData.address1,
            address2: personalData.address2,
            email: personalData.email,
            phone: personalData.phone,
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
