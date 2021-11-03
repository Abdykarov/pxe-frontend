import {Apollo} from 'apollo-angular';
import { Injectable } from '@angular/core';



import {
    makeRegistrationMutation,
    makeUnregistrationMutation,
    sendUnregisterSmsMutation,
} from 'src/common/graphql/mutation/registration';

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
                withSmsCode: !!smsCode,
            },
        })

    public sendUnregisterSms = () => this.apollo
        .mutate<any>({
            mutation: sendUnregisterSmsMutation,
        })
}
