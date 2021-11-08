import { gql } from 'apollo-angular';

export const getAskForOfferQuery = gql`
    query queryAskForOfferContents {
        queryAskForOfferContents {
            flatData {
                firstStep
                secondStep
                title
            }
        }
    }
`;
