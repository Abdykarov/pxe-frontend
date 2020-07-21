import gql from 'graphql-tag';

export const offerFragment = gql`
    fragment offerFragment on Offer {
        id,
        supplier{
            id,
            name,
            vatNumber,
            logoPath,
        },
        status,
        commodityType,
        name,
        validFrom,
        validTo,
        deliveryFrom,
        deliveryTo,
        deliveryLength,
        distributionLocation{
            type,
            code,
            description,
            help,
        },
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
        priceVTWithVAT,
        priceNTWithVAT,
        priceGasWithVAT,
        prepayment,
        unit,
        accountingRegulatedPrice,
        monthlyConsumptionFee,
        totalPrice,
        energyTaxRegulatedPrice,
        marketOrganizerRegulatedPrice,
        renewableEnergyRegulatedPrice,
        distributionPriceByCapacity,
        distributionPriceByConsumptionVT,
        distributionPriceByConsumptionNT,
        systemServicesRegulatedPrice,
        consumptionPriceVT,
        consumptionPriceNT,
        greenEnergy
    }
`;


export const findSupplierOffersQuery = gql`
    query findSupplierOffers{
        findSupplierOffers{
            ...offerFragment,
            marked @client,
        }
    }
    ${offerFragment}
`;

export const findSupplyPointOffersQuery = gql`
    query findSupplyPointOffers($identificationNumber: String!){
        findSupplyPointOffers(identificationNumber: $identificationNumber){
            ...offerFragment
        }
    }
    ${offerFragment}
`;
