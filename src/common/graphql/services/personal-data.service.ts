import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';

import { IPersonalDataInput } from '../models/personal-data.model';
import { getPersonalData } from 'src/common/graphql/queries/personal-data';
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

    public savePersonalData(contractId: number, personalData: IPersonalDataInput) {
        return this.apollo
            .mutate({
                mutation: savePersonalData,
                variables: {
                    contractId,
                    personalData,
                },
            });
    }

}
