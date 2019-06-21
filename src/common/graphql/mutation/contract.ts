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
