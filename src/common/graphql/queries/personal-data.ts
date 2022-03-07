import { gql } from 'apollo-angular';

export const getPersonalDataQuery = gql`
    query getPersonalData($contractId: ID!) {
        getPersonalData(contractId: $contractId) {
            name
            birthDate
            ico
            dic
            address1 {
                street
                orientationNumber
                descriptiveNumber
                city
                postCode
                region
            }
            address2 {
                street
                orientationNumber
                descriptiveNumber
                city
                postCode
                region
            }
            email
            phone
            bankAccountNumber
            bankCode
            depositPaymentType {
                type
                code
                description
                help
            }
            deposit
        }
    }
`;
