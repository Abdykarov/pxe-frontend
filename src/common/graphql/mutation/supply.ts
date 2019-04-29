import gql from 'graphql-tag';

export const saveElectricitySupplyPoint = gql`
    mutation saveElectricitySupplyPoint($supplyPoint:SupplyPointInput){
        saveElectricitySupplyPoint(supplyPoint:$supplyPoint)
    }
`;
