import {gql} from 'apollo-angular';


export const resetPasswordMutation = gql`
    mutation resetPassword($login: String!) {
        resetPassword(login: $login)
    }
`;

export const changePasswordMutation = gql`
    mutation changePassword($oldPassword: String!, $newPassword: String!) {
        changePassword(oldPassword: $oldPassword,newPassword: $newPassword) {
            token,
            landingPage,
        }
    }
`;

export const updateUserProfileMutation = gql`
    mutation updateUserProfile($userDetail: UserDetailInput!, $smsCode: String!) {
        updateUserProfile(userDetail: $userDetail, smsCode: $smsCode)
    }
`;

export const unsubscribeNotificationsMutation = gql`
    mutation unsubscribeNotifications(
        $userProfileId: ID!,
    ){
        unsubscribeNotifications(
            userProfileId: $userProfileId,
        )
    }
`;

export const sendChangePhoneNumberSmsMutation = gql`
    mutation sendChangePhoneNumberSms($phoneNumber: String!) {
        sendChangePhoneNumberSms(phoneNumber: $phoneNumber)
    }
`;

export const updateNotificationsAllowedMutation = gql`
    mutation updateNotificationsAllowed($notificationsAllowed: Boolean!) {
        updateNotificationsAllowed(notificationsAllowed: $notificationsAllowed)
    }
`;

