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

    public resetPassword = (login: string)  => this.apollo
        .mutate<any>({
            mutation: resetPasswordMutation,
            variables: {
                login,
            },
        })

    public changePassword = (oldPassword: string, newPassword: string) => this.apollo
        .mutate<any>({
            mutation: changePasswordMutation,
            variables: {
                oldPassword,
                newPassword,
            },
        })

    public updateUserProfile = (userDetail: IUserDetailInput) => this.apollo
        .mutate<any>({
            mutation: updateUserProfileMutation,
            variables: {
                userDetail,
            },
        })
}
