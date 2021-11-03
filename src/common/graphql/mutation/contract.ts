import {gql} from 'apollo-angular';


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

export const concludeContractMutation = gql`
    mutation concludeContract($contractId: ID!){
        concludeContract(contractId: $contractId)
    }
`;

export const signContractMutation = gql`
    mutation signContract($contractId: ID!, $smsCode: String){
        signContract(contractId: $contractId, smsCode: $smsCode)
    }
`;

export const sendContractConfirmationSmsMutation = gql`
    mutation sendContractConfirmationSms($contractId: ID!){
        sendContractConfirmationSms(contractId: $contractId)
    }
`;

export const deleteSignedContractMutation = gql`
    mutation deleteSignedContract(
        $contractId: ID!,
        $smsConfirmationCode: String!,
        $contractDeleteReason: ContractDeleteReason!
    ){
        deleteSignedContract(
            contractId: $contractId,
            smsConfirmationCode: $smsConfirmationCode,
            contractDeleteReason: $contractDeleteReason
        )
    }
`;

export const deleteSelectedOfferFromContractMutation = gql`
    mutation deleteSelectedOfferFromContract($contractId: ID!){
        deleteSelectedOfferFromContract(contractId: $contractId)
    }
`;

export const confirmFirstContractViewMutation = gql`
    mutation confirmFirstContractView{
        confirmFirstContractView
    }
`;

export const unsetContractProlongationMutation = gql`
    mutation unsetContractProlongation($contractId: ID!, $smsCode: String!){
        unsetContractProlongation(contractId: $contractId, smsCode: $smsCode)
    }
`;
