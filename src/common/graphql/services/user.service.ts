import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { IUserDetailInput } from 'src/common/graphql/models/user.model';
import {
    changePasswordMutation,
    resetPasswordMutation,
    sendChangePhoneNumberSmsMutation,
    unsubscribeNotificationsMutation,
    updateNotificationsAllowedMutation,
    updateUserProfileMutation,
} from 'src/common/graphql/mutation/user';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private apollo: Apollo) {}

    public resetPassword = (login: string) =>
        this.apollo.mutate<any>({
            mutation: resetPasswordMutation,
            variables: {
                login,
            },
        });

    public changePassword = (oldPassword: string, newPassword: string) =>
        this.apollo.mutate<any>({
            mutation: changePasswordMutation,
            variables: {
                oldPassword,
                newPassword,
            },
        });

    public unsubscribeNotification = (userProfileId: string) =>
        this.apollo.mutate<any>({
            mutation: unsubscribeNotificationsMutation,
            variables: {
                userProfileId,
            },
        });

    public updateUserProfile = (
        userDetail: IUserDetailInput,
        smsCode: string = ''
    ) =>
        this.apollo.mutate<any>({
            mutation: updateUserProfileMutation,
            variables: {
                userDetail,
                smsCode,
            },
        });

    public sendChangePhoneNumberSmsMutation = (phoneNumber: string) =>
        this.apollo.mutate<any>({
            mutation: sendChangePhoneNumberSmsMutation,
            variables: {
                phoneNumber,
            },
        });

    public updateNotificationsAllowed = (notificationsAllowed: boolean) =>
        this.apollo.mutate<any>({
            mutation: updateNotificationsAllowedMutation,
            variables: {
                notificationsAllowed,
            },
        });
}
