import gql from 'graphql-tag';

export const saveContractMutation = gql`
    mutation saveContract($offerId: ID!, $supplyPointId: ID!){
        saveContract(offerId: $offerId, supplyPointId: $supplyPointId)
    }
`;

export const updateContractMutation = gql`
    mutation updateContract($contractId: ID!){
        updateContract(contractId: $contractId)
    }
`;

export const deleteContractMutation = gql`
    mutation deleteContract($contractId: ID!){
        deleteContract(contractId: $contractId)
    }
`;

export const concludeContractMutation = gql`
    mutation concludeContract($contractId: ID!){
        concludeContract(contractId: $contractId)
    }
`;

export const signContractMutation = gql`
    mutation signContract($contractId: Int!, $smsCode: String){
        signContract(contractId: $contractId, smsCode: $smsCode)
    }
`;


    export const sendContractConfirmationSmsMutation = gql`
    mutation sendContractConfirmationSms($contractId: ID!){
        sendContractConfirmationSms(contractId: $contractId)
    }
`;
