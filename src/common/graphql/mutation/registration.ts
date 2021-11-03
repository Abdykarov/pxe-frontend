import {gql} from 'apollo-angular';


export const makeRegistrationMutation = gql`
    mutation makeRegistration($email: String!, $consent: Boolean!, $preregistration: Boolean) {
        makeRegistration(email: $email, termsOfConditionsApproved: $consent, preregistration: $preregistration)
    }
`;

export const makeUnregistrationMutation = gql`
    mutation makeUnregistration($smsCode: String) {
        makeUnregistration(smsCode: $smsCode)
    }
`;

export const sendUnregisterSmsMutation = gql`
    mutation sendUnregisterSms{
        sendUnregisterSms
    }
`;

