import { gql } from 'apollo-angular';

export const listAskForOfferQuery = gql`
    query listAskForOffer($filter: AskForOfferFilter!) {
        listAskForOffer(filter: $filter) {
            page {
                id
                createdAt
                status
                email
                files {
                    id
                    fileName
                }
            }
            totalRecords
        }
    }
`;
