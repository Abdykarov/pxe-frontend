import gql from 'graphql-tag';

export const getContractTerms = gql`
    query getContractTerms($contractId: ID!){
        getContractTerms(contractId: $contractId){
            content
        }
    }
`;
