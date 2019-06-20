import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';

import { IPersonalData, IPersonalDataInput } from '../models/personal-data.model';
import { getPersonalData } from 'src/common/graphql/queries/personal-data';
import { savePersonalData } from 'src/common/graphql/mutation/personal-data';
import { IAddress, ICodelistItem, ISupplyPoint } from '../models/supply.model';
import { getSupplyPoint } from '../queries/supply';
import { ISupplyPointOffer } from '../models/offer.model';
import { findSupplyPointOffers } from '../queries/offer';

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
                                supplyPointId: parseInt(String(supplyPointOld.id), 10),
                            },
                        });

                    const supplyPoint: ISupplyPoint = getSupplyPointResult.getSupplyPoint;
                    this.loadSupplyPoint(supplyPoint, personalData);

                    cache.writeQuery({
                        query: getSupplyPoint,
                        data: { getSupplyPoint: supplyPoint},
                        variables: {
                            supplyPointId: parseInt(String(supplyPointOld.id), 10),
                        },
                    });
                },
            });
    }

    loadSupplyPoint = (supplyPoint: ISupplyPoint, personalData: IPersonalDataInput) => {
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
