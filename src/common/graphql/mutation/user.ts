import gql from 'graphql-tag';

export const userLogin = gql`
    mutation userLogin($userPayload: any!) {
        userLogin(userPayload: $userPayload) @client
    }
`;
