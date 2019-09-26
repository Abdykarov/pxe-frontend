import gql from 'graphql-tag';

export const getContractTermsQuery = gql`
    query getContractTerms($contractId: ID!){
        getContractTerms(contractId: $contractId){
            content
        }
    }
`;

export const getPaymentInfoQuery = gql`
    query getPaymentInfo($contractId: ID!, $setting: QRCodeSetting!){
        getPaymentInfo(contractId: $contractId, setting: $setting){
            accountNumber {
                accountNumber
                accountPrefix
                bankCode
                iban
            }
            amount
            currency {
                currencyCode
            }
            dueDate
            encodedQrCode
            msg
            variableSymbol {
                value
            }
        }
    }
`;