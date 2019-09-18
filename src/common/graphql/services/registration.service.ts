import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';

import {
    makeRegistrationMutation,
    makeUnregistrationMutation,
} from 'src/common/graphql/mutations';


@Injectable({
    providedIn: 'root',
})
export class RegistrationService {

    constructor(
        private apollo: Apollo,
    ) {}

    public makeRegistration = (values: any)  => this.apollo
        .mutate({
            mutation: makeRegistrationMutation,
            variables: {
                values,
            },
        })

    public makeUnregistration = (smsCode: string) => this.apollo
        .mutate({
            mutation: makeUnregistrationMutation,
            variables: {
                smsCode,
            },
        })
}
