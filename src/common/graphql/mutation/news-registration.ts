import gql from 'graphql-tag';

export const makeRegistration = gql`
    mutation makeRegistration($email: String!, $consent: Boolean!) {
        makeRegistration(email: $email, termsOfConditionsApproved: $consent)
    }
`;
