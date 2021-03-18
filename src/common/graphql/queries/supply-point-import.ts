import gql from 'graphql-tag';
import { supplyPointFragment } from './supply';


export const getActiveAskForOfferIdQuery = gql`
    query {
        createUser @client{
            activeAskForOfferId
        }
    }
`;


export const findSupplyPointImportsQuery = gql`
    query findSupplyPointImports($askForOfferId: ID!, $skipInfoAboutRelationContracts: Boolean = true, $skipOfferValidity: Boolean = true){
        findSupplyPointImports(askForOfferId: $askForOfferId){
            ...SupplyPointFragment
        }
    }
    ${supplyPointFragment}
`;
