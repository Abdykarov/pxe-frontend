import gql from 'graphql-tag';

export const createPowerSupplyPointImportMutation = gql`
    mutation createPowerSupplyPointImport(
        $supplyPoint: SupplyPointInputImport!,
        $powerAttributes: SupplyPointInputPowerAttributesImport!,
    ){
        createPowerSupplyPoint(
            supplyPoint: $supplyPoint,
            powerAttributes: $powerAttributes,
        )
    }
`;

export const createGasSupplyPointImportMutation = gql`
    mutation createGasSupplyPointImport(
        $supplyPoint: SupplyPointInputImport!,
        $gasAttributes: SupplyPointInputGasAttributesImport!,
    ){
        createGasSupplyPoint(
            supplyPoint: $supplyPoint,
            gasAttributes: $gasAttributes,
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
