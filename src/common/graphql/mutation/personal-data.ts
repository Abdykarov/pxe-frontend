import gql from 'graphql-tag';

export const savePersonalData = gql`
    mutation savePersonalData($contractId: ID!, $personalData: PersonalDataInput!) {
        savePersonalData(contractId: $contractId,personalData: $personalData)
    }
`;
