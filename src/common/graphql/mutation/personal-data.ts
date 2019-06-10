import gql from 'graphql-tag';

export const savePersonalData = gql`
    mutation savePersonalData($contractId: Int!, $personalData: PersonalDataInput!) {
        savePersonalData(contractId: $contractId,personalData: $personalData)
    }
`;
