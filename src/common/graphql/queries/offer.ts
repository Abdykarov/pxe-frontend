import gql from 'graphql-tag';

export const findOffers = gql`
    query findOffers{
        findOffers{
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

