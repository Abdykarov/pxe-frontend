import gql from 'graphql-tag';

export const getContractTermsQuery = gql`
    query getContractTerms($contractId: ID!){
        getContractTerms(contractId: $contractId){
            content
        }
    }
`;
