import { gql } from 'apollo-angular';

export const deleteAskForOfferMutation = gql`
    mutation deleteAskForOffer($askForOfferId: ID!) {
        deleteAskForOffer(askForOfferId: $askForOfferId)
    }
`;

export const finalizeAskForOfferMutation = gql`
    mutation finalizeAskForOffer($askForOfferId: ID!) {
        finalizeAskForOffer(askForOfferId: $askForOfferId)
    }
`;

export const createAskForOffer = gql`
    mutation createAskForOffer {
        createAskForOffer
    }
`;
