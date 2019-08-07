import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';

import {
    changePasswordMutation,
    resetPasswordMutation,
    updateUserProfileMutation,
} from 'src/common/graphql/mutation/user';
import { IUserDetailInput } from 'src/common/graphql/models/user.model';


@Injectable({
    providedIn: 'root',
})
export class UserService {

    constructor(
        private apollo: Apollo,
    ) {}

    public resetPassword(email: string) {
        return this.apollo
            .mutate({
                mutation: resetPasswordMutation,
                variables: {
                    email,
                },
            });
    }

    changePassword(oldPassword: string, newPassword: string) {
        return this.apollo
            .mutate({
                mutation: changePasswordMutation,
                variables: {
                    oldPassword,
                    newPassword,
                },
            });
    }

    updateUserProfile(userDetail: IUserDetailInput) {
        return this.apollo
            .mutate({
                mutation: updateUserProfileMutation,
                variables: {
                    userDetail,
                },
            });
    }
}
