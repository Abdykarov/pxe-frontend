import gql from 'graphql-tag';

export const saveContract = gql`
    mutation saveContract($offerId: ID!, $supplyPointId: ID!){
        saveContract(offerId: $offerId, supplyPointId: $supplyPointId)
    }
`;

export const updateContract = gql`
    mutation updateContract($contractId: ID!){
        updateContract(contractId: $contractId)
    }
`;

export const deleteContract = gql`
    mutation deleteContract($contractId: ID!){
        deleteContract(contractId: $contractId)
    }
`;

export const concludeContract = gql`
    mutation concludeContract($contractId: ID!){
        concludeContract(contractId: $contractId)
    }
`;

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
