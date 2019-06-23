import gql from 'graphql-tag';

export const resetPassword = gql`
    mutation resetPassword($email: String!) {
        resetPassword(email: $email)
    }
`;

export const changePassword = gql`
    mutation changePassword($oldPassword: String!, $newPassword: String!) {
        changePassword(oldPassword: $oldPassword,newPassword: $newPassword) {
            token,
            landingPage,
        }
    }
`;
