import gql from 'graphql-tag';

export const savePowerSupplyPointMutation = gql`
    mutation savePowerSupplyPoint($supplyPoint: SupplyPointInput!, $powerAttributes: SupplyPointInputPowerAttributes!){
        savePowerSupplyPoint(supplyPoint: $supplyPoint, powerAttributes: $powerAttributes)
    }
`;

export const saveGasSupplyPointMutation = gql`
    mutation saveGasSupplyPoint($supplyPoint: SupplyPointInput!, $gasAttributes: SupplyPointInputGasAttributes!){
        saveGasSupplyPoint(supplyPoint: $supplyPoint, gasAttributes: $gasAttributes)
    }
`;

export const updatePowerSupplyPointWithContractMutation = gql`
    mutation updatePowerSupplyPointWithContract(
        $supplyPointId: ID!,
        $supplyPointUpdate: SupplyPointUpdateInput!,
        $powerAttributes: SupplyPointUpdatePowerAttributes!,
    ){
        updatePowerSupplyPointWithContract(
            supplyPointId: $supplyPointId,
            supplyPointUpdate: $supplyPointUpdate,
            powerAttributes: $powerAttributes,
        )
    }
`;

export const updateGasSupplyPointWithContractMutation = gql`
    mutation updateGasSupplyPointWithContract(
        $supplyPointId: ID!,
        $supplyPointUpdate: SupplyPointUpdateInput!,
        $gasAttributes: SupplyPointUpdateGasAttributes!,
    ){
        updatePowerSupplyPointWithContract(
            supplyPointId: $supplyPointId,
            supplyPointUpdate: $supplyPointUpdate,
            gasAttributes: $powerAttributes,
        )
    }
`;
