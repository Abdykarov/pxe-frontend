import gql from 'graphql-tag';

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

