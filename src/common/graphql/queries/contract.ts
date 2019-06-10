import gql from 'graphql-tag';

export const getContractTerms = gql`
    query getContractTerms($contractId: Int!){
        getContractTerms(contractId: $contractId){
            content
        }
    }
`;
