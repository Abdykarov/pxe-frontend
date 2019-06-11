import gql from 'graphql-tag';

export const signContract = gql`
    mutation signContract($contractId: Int!, $smsCode: String){
        signContract(contractId: $contractId, smsCode: $smsCode)
    }
`;

export const sendContractConfirmationSms = gql`
    mutation sendContractConfirmationSms($contractId: Int!){
        sendContractConfirmationSms(contractId: $contractId)
    }
`;
