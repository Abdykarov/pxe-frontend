import gql from 'graphql-tag';

export const findSupplyPointOffers = gql`
    query getContractTerms($contractId: Int!){
        getContractTerms(contractId: $contractId){
            content
        }
    }
`;
