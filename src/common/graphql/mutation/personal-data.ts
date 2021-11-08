import { gql } from 'apollo-angular';

export const savePersonalDataMutation = gql`
    mutation savePersonalData(
        $contractId: ID!
        $personalData: PersonalDataInput!
    ) {
        savePersonalData(contractId: $contractId, personalData: $personalData)
    }
`;

export const updatePersonalDataMutation = gql`
    mutation updatePersonalData(
        $contractId: ID!
        $personalData: PersonalDataInput!
    ) {
        updatePersonalData(contractId: $contractId, personalData: $personalData)
    }
`;
