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

