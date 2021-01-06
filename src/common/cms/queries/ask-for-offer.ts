import gql from 'graphql-tag';

export const getAskForOfferQuery = gql`
    query queryAskForOfferContents {
      queryAskForOfferContents {
        flatData {
          firstStep,
          secondStep,
          title
        }
      }
    }
`;
