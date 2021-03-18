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

export const setActiveAskForOfferIdMutation = gql`
    mutation setActiveAskForOfferId($askForOfferId: ID!) {
        setActiveAskForOfferId(askForOfferId: $askForOfferId) @client
    }
`;
