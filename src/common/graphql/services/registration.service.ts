import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';

import {
    makeRegistrationMutation,
    makeUnregistrationMutation, makeUnregistrationWithoutSmsMutation,
    sendUnregisterSmsMutation,
} from 'src/common/graphql/mutations';


@Injectable({
    providedIn: 'root',
})
export class RegistrationService {

    constructor(
        private apollo: Apollo,
    ) {}

    public makeRegistration = (values: any)  => this.apollo
        .mutate<any>({
            mutation: makeRegistrationMutation,
            variables: {
                ...values,
            },
        })

    public makeUnregistration = (smsCode: string) => this.apollo
        .mutate<any>({
            mutation: makeUnregistrationMutation,
            variables: {
                smsCode,
            },
        })

    public makeUnregistrationWithoutSms = () => this.apollo
        .mutate<any>({
            mutation: makeUnregistrationWithoutSmsMutation,
        })

    public sendUnregisterSms = () => this.apollo
        .mutate<any>({
            mutation: sendUnregisterSmsMutation,
        })
}
