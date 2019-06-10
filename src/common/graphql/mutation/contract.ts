import gql from 'graphql-tag';

export const signContract = gql`
    mutation signContract($contractId: Int!, $smsCode: String){
        signContract(contractId: $contractId, smsCode: $smsCode)
    }
`;

