import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';

import {
    changePassword,
    resetPassword,
} from '../mutation/password';


@Injectable({
    providedIn: 'root',
})
export class PasswordService {

    constructor(
        private apollo: Apollo,
    ) {}

    public resetPassword(email: string) {
        return this.apollo
            .mutate({
                mutation: resetPassword,
                variables: {
                    email,
                },
            });
    }

    changePassword(oldPassword: string, newPassword: string) {
        return this.apollo
            .mutate({
                mutation: changePassword,
                variables: {
                    oldPassword,
                    newPassword,
                },
            });
    }
}
