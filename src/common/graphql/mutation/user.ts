import gql from 'graphql-tag';

export const resetPasswordMutation = gql`
    mutation resetPassword($email: String!) {
        resetPassword(email: $email)
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
    mutation updateUserProfile($userDetail: UserDetailInput!) {
        updateUserProfile(userDetail: $userDetail)
    }
`;
