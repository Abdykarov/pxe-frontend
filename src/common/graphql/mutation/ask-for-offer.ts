import gql from 'graphql-tag';

export const createSupplyPointImportMutation = gql`
    mutation createSupplyPointImport(
        $askForOfferId: ID!,
        $supplyPoint: SupplyPointInputImport!,
    ){
        createSupplyPointImport(
            askForOfferId: $askForOfferId,
            supplyPoint: $supplyPoint,
        )
    }
`;

export const deleteAskForOfferMutation = gql`
    mutation deleteAskForOffer(
        $askForOfferId: ID!,
    ){
        deleteAskForOffer(
            askForOfferId: $askForOfferId,
        )
    }
`;


export const finalizeAskForOfferMutation = gql`
    mutation finalizeAskForOffer(
        $askForOfferId: ID!,
    ){
        finalizeAskForOffer(
            askForOfferId: $askForOfferId,
        )
    }
`;
