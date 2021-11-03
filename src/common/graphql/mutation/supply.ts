import {gql} from 'apollo-angular';


export const createPowerSupplyPointMutation = gql`
    mutation createPowerSupplyPoint(
        $supplyPoint: SupplyPointInput!,
        $powerAttributes: SupplyPointInputPowerAttributes!,
    ){
        createPowerSupplyPoint(
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
        updateGasSupplyPointWithContract(
            supplyPointId: $supplyPointId,
            supplyPointUpdate: $supplyPointUpdate,
            attributes: $attributes,
        )
    }
`;

export const deleteUnfinishedSupplyPointMutation = gql`
    mutation deleteUnfinishedSupplyPoint(
        $supplyPointId: ID!,
    ){
        deleteUnfinishedSupplyPoint(
            supplyPointId: $supplyPointId,
        )
    }
`;
