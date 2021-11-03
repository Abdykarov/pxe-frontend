import {gql} from 'apollo-angular';


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
