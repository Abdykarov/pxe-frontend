import { gql } from 'apollo-angular';
import { offerFragment } from 'src/common/graphql/queries/offer';

export const savePowerOfferMutation = gql`
    mutation savePowerOffer(
        $offer: OfferInput!
        $powerAttributes: OfferInputPowerAttributes!
    ) {
        savePowerOffer(offer: $offer, powerAttributes: $powerAttributes) {
            ...offerFragment
        }
    }
    ${offerFragment}
`;

export const saveGasOfferMutation = gql`
    mutation saveGasOffer(
        $offer: OfferInput!
        $gasAttributes: OfferInputGasAttributes!
    ) {
        saveGasOffer(offer: $offer, gasAttributes: $gasAttributes) {
            ...offerFragment
        }
    }
    ${offerFragment}
`;

export const updatePowerOfferMutation = gql`
    mutation updatePowerOffer(
        $offerId: ID!
        $offer: OfferInput!
        $powerAttributes: OfferInputPowerAttributes!
    ) {
        updatePowerOffer(
            offerId: $offerId
            offer: $offer
            powerAttributes: $powerAttributes
        ) {
            ...offerFragment
        }
    }
    ${offerFragment}
`;

export const updateGasOfferMutation = gql`
    mutation updateGasOffer(
        $offerId: ID!
        $offer: OfferInput!
        $gasAttributes: OfferInputGasAttributes!
    ) {
        updateGasOffer(
            offerId: $offerId
            offer: $offer
            gasAttributes: $gasAttributes
        ) {
            ...offerFragment
        }
    }
    ${offerFragment}
`;

export const deleteOfferMutation = gql`
    mutation deleteOffer($offerId: ID!) {
        deleteOffer(offerId: $offerId)
    }
`;
