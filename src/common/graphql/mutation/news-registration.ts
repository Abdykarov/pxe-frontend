import gql from 'graphql-tag';

export const makeRegistrationMutation = gql`
    mutation makeRegistration($email: String!, $consent: Boolean!, $preregistration: Boolean) {
        makeRegistration(email: $email, termsOfConditionsApproved: $consent, preregistration: $preregistration)
    }
`;
