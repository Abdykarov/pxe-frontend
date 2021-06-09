import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';

import {
    changePasswordMutation,
    resetPasswordMutation,
    sendChangePhoneNumberSmsMutation,
    updateUserProfileMutation,
    updateWatchDogNotificationMutation,
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

    public updateUserProfile = (userDetail: IUserDetailInput, smsCode: string = '') => this.apollo
        .mutate<any>({
            mutation: updateUserProfileMutation,
            variables: {
                userDetail,
                smsCode,
            },
        })

    public sendChangePhoneNumberSmsMutation = (phoneNumber: string) => this.apollo
        .mutate<any>({
                mutation: sendChangePhoneNumberSmsMutation,
                variables: {
                    phoneNumber,
                },
            })

    public updateWatchDogNotification = (withWatchDogNotification: boolean) => this.apollo
        .mutate<any>({
            mutation: updateWatchDogNotificationMutation,
            variables: {
                withWatchDogNotification,
            },
        })
}
