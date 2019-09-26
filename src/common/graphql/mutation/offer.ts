import gql from 'graphql-tag';

export const savePowerOfferMutation = gql`
    mutation savePowerOffer($offer: OfferInput!, $powerAttributes: OfferInputPowerAttributes!){
        savePowerOffer(offer: $offer, powerAttributes: $powerAttributes)
    }
`;

export const saveGasOfferMutation = gql`
    mutation saveGasOffer($offer: OfferInput!, $gasAttributes: OfferInputGasAttributes!){
        saveGasOffer(offer: $offer, gasAttributes: $gasAttributes)
    }
`;

export const updatePowerOfferMutation = gql`
    mutation updatePowerOffer($offerId: ID!, $offer: OfferInput!,$powerAttributes: OfferInputPowerAttributes!){
        updatePowerOffer(offerId: $offerId, offer: $offer, powerAttributes: $powerAttributes)
    }
`;

export const updateGasOfferMutation = gql`
    mutation updateGasOffer($offerId: ID!, $offer: OfferInput!,$gasAttributes: OfferInputGasAttributes!){
        updateGasOffer(offerId: $offerId, offer: $offer, gasAttributes: $gasAttributes)
    }
`;

export const deleteOfferMutation = gql`
    mutation deleteOffer($offerId: ID!){
        deleteOffer(offerId: $offerId)
    }
`;
