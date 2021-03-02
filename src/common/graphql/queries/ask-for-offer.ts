import gql from 'graphql-tag';

import { supplyPointFragment } from './supply';

export const listAskForOfferQuery = gql`
    query listAskForOffer($filter: AskForOfferFilter!){
        listAskForOffer(filter: $filter){
            page {
                id,
                createdAt,
                status,
                email,
                files {
                    id,
                    fileName,
                },
            }
            totalRecords,

        }
    }
`;

export const findSupplyPointImportQuery = gql`
    query findSupplyPointImport($askForOfferId: ID!, $skipInfoAboutRelationContracts: Boolean = true, $skipOfferValidity: Boolean = true){
        findSupplyPointImport(askForOfferId: $askForOfferId){
            ...SupplyPointFragment
        }
    }
    ${supplyPointFragment}
`;
