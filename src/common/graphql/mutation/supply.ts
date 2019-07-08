import gql from 'graphql-tag';

export const savePowerSupplyPoint = gql`
    mutation savePowerSupplyPoint(
        $supplyPoint: SupplyPointInput!,
        $powerAttributes: SupplyPointInputPowerAttributes!,
    ){
        savePowerSupplyPoint(
            supplyPoint: $supplyPoint,
            powerAttributes: $powerAttributes,
        )
    }
`;

export const createGasSupplyPointMutation = gql`
    mutation createGasSupplyPoint(
        $supplyPoint: SupplyPointInput!,
        $gasAttributes: SupplyPointInputGasAttributes!,
    ){
        createGasSupplyPoint(
            supplyPoint: $supplyPoint,
            gasAttributes: $gasAttributes,
        )
    }
`;

export const updatePowerSupplyPointMutation = gql`
    mutation updatePowerSupplyPoint(
        $supplyPointId: ID!,
        $supplyPoint: SupplyPointInput!,
        $powerAttributes: SupplyPointInputPowerAttributes!,
    ){
        updatePowerSupplyPoint(
            supplyPointId: $supplyPointId,
            supplyPoint: $supplyPoint,
            powerAttributes: $powerAttributes,
        )
    }
`;

export const updateGasSupplyPointMutation = gql`
    mutation updateGasSupplyPoint(
        $supplyPointId: ID!,
        $supplyPoint: SupplyPointInput!,
        $gasAttributes: SupplyPointInputGasAttributes!,
    ){
        updateGasSupplyPoint(
            supplyPointId: $supplyPointId,
            supplyPoint: $supplyPoint,
            gasAttributes: $gasAttributes,
        )
    }
`;

export const updatePowerSupplyPointWithContractMutation = gql`
    mutation updatePowerSupplyPointWithContract(
        $supplyPointId: ID!,
        $supplyPointUpdate: SupplyPointUpdate,
        $attributes: SupplyPointUpdatePowerAttributes,
    ){
        updatePowerSupplyPointWithContract(
            supplyPointId: $supplyPointId,
            supplyPointUpdate: $supplyPointUpdate,
            attributes: $attributes,
        )
    }
`;

export const updateGasSupplyPointWithContractMutation = gql`
    mutation updateGasSupplyPointWithContract(
        $supplyPointId: ID!,
        $supplyPointUpdate: SupplyPointUpdate,
        $attributes: SupplyPointUpdateGasAttributes,
    ){
        updatePowerSupplyPointWithContract(
            supplyPointId: $supplyPointId,
            supplyPointUpdate: $supplyPointUpdate,
            attributes: $attributes,
        )
    }
`;
