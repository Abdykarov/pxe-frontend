import gql from 'graphql-tag';

export const findOffers = gql`
    query findSupplierOffers{
        findSupplierOffers{
            id,
            supplier{
                id,
                name,
                vatNumber,
                logoPath,
                sampleDocuments{
                    type,
                    url
                }
            },
            status,
            commodityType,
            name,
            validFrom,
            validTo,
            deliveryFrom,
            deliveryTo,
            deliveryLength,
            distributionLocation,
            permanentPaymentPrice,
            subject{
                type,
                code,
                description,
                help,
            },
            benefits,
            priceVT,
            priceNT,
            distributionRate{
                type,
                code,
                description,
                help,
            },
            circuitBreaker{
                type,
                code,
                description,
                help,
            },
            priceGas,
            annualConsumption{
                type,
                code,
                description,
                help,
            },
        }
    }
`;

export const findSupplyPointOffers = gql`
    query findSupplyPointOffers($ean: String!){
        findSupplyPointOffers(ean: $ean){
            id,
            supplier{
                id,
                name,
                vatNumber,
                logoPath,
                sampleDocuments{
                    type,
                    url
                }
            },
            commodityType,
            name,
            validFrom,
            validTo,
            deliveryFrom,
            deliveryLength,
            permanentPaymentPrice,
            benefits,
            priceVT,
            priceNT,
            priceGas,
        }
    }
`;
