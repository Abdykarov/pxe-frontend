import gql from 'graphql-tag';
import {supplyPointFragment} from './supply';

export const findSupplyPointImportQuery = gql`
    query findSupplyPointImport($askForOfferId: ID!, $skipInfoAboutRelationContracts: Boolean = true, $skipOfferValidity: Boolean = true){
        findSupplyPointImport(askForOfferId: $askForOfferId){
            ...SupplyPointFragment
        }
    }
    ${supplyPointFragment}
`;
