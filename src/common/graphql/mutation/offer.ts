import gql from 'graphql-tag';

export const savePowerOffer = gql`
    mutation savePowerOffer($offer: OfferInput!, $powerAttributes: OfferInputPowerAttributes!){
        savePowerOffer(offer: $offer, powerAttributes: $powerAttributes)
    }
`;

export const saveGasOffer = gql`
    mutation saveGasOffer($offer: OfferInput!, $gasAttributes: OfferInputGasAttributes!){
        saveGasOffer(offer: $offer, gasAttributes: $gasAttributes)
    }
`;

export const updatePowerOffer = gql`
    mutation updatePowerOffer($offerId: ID!, $offer: OfferInput!,$powerAttributes: OfferInputPowerAttributes!){
        updatePowerOffer(offerId: $offerId, offer: $offer, powerAttributes: $powerAttributes)
    }
`;

export const updateGasOffer = gql`
    mutation updateGasOffer($offerId: ID!, $offer: OfferInput!,$gasAttributes: OfferInputGasAttributes!){
        updateGasOffer(offerId: $offerId, offer: $offer, gasAttributes: $gasAttributes)
    }
`;

export const deleteOffer = gql`
    mutation deleteOffer($offerId: ID!){
        deleteOffer(offerId: $offerId)
    }
`;
