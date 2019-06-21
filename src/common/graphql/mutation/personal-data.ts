import gql from 'graphql-tag';

export const savePersonalDataMutation = gql`
    mutation savePersonalData($contractId: ID!, $personalData: PersonalDataInput!) {
        savePersonalData(contractId: $contractId,personalData: $personalData)
    }
`;
