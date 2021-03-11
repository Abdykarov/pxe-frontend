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
