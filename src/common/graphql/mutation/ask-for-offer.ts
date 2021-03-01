import gql from 'graphql-tag';

export const createPowerSupplyPointImportMutation = gql`
    mutation createPowerSupplyPointImport(
        $supplyPoint: SupplyPointInputImport!,
        $powerAttributes: SupplyPointInputPowerAttributesImport!,
    ){
        createPowerSupplyPointImport(
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
        createGasSupplyPointImport(
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
