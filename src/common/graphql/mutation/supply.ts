import gql from 'graphql-tag';

export const saveElectricitySupplyPoint = gql`
    mutation savePowerSupplyPoint($supplyPoint: SupplyPointInput,$powerAttributes: SupplyPointInputPowerAttributes){
        savePowerSupplyPoint(supplyPoint: $supplyPoint,powerAttributes: $powerAttributes)
    }
`;

export const saveGasSupplyPoint = gql`
    mutation saveGasSupplyPoint($supplyPoint: SupplyPointInput,$gasAttributes: SupplyPointInputGasAttributes){
        saveGasSupplyPoint(supplyPoint: $supplyPoint,gasAttributes: $gasAttributes)
    }
`;
