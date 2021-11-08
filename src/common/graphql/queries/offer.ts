import { gql } from 'apollo-angular';

export const offerFragment = gql`
    fragment offerFragment on Offer {
        id
        supplier {
            id
            name
            vatNumber
            logoPath
        }
        status
        commodityType
        name
        validFrom
        validTo
        deliveryFrom
        deliveryTo
        deliveryLength
        distributionLocation {
            type
            code
            description
            help
        }
        permanentPaymentPrice
        subject {
            type
            code
            description
            help
        }
        benefits
        priceVT
        priceNT
        distributionRate {
            type
            code
            description
            help
        }
        circuitBreaker {
            type
            code
            description
            help
        }
        priceGas
        annualConsumption {
            type
            code
            description
            help
        }
        priceVTWithVAT
        priceNTWithVAT
        priceGasWithVAT
        unit
        accountingRegulatedPrice
        monthlyConsumptionFee
        totalPrice
        energyTaxRegulatedPrice
        marketOrganizerRegulatedPrice
        renewableEnergyRegulatedPrice
        distributionPriceByCapacity
        distributionPriceByConsumptionVT
        distributionPriceByConsumptionNT
        distributionPriceByConsumptionGas
        systemServicesRegulatedPrice
        consumptionPriceGas
        consumptionPriceVT
        consumptionPriceNT
        greenEnergy
    }
`;

export const findSupplierOffersQuery = gql`
    query findSupplierOffers {
        findSupplierOffers {
            ...offerFragment
            marked @client
            isLastUpdated @client
        }
    }
    ${offerFragment}
`;

export const findSupplyPointOffersQuery = gql`
    query findSupplyPointOffers($identificationNumber: String!) {
        findSupplyPointOffers(identificationNumber: $identificationNumber) {
            offers {
                ...offerFragment
            }
            pastOffer {
                supplier {
                    id
                    name
                    vatNumber
                    logoPath
                }
                status
                commodityType
                name
                validFrom
                validTo
                deliveryFrom
                deliveryTo
                deliveryLength
                distributionLocation {
                    type
                    code
                    description
                    help
                }
                permanentPaymentPrice
                subject {
                    type
                    code
                    description
                    help
                }
                benefits
                priceVT
                priceNT
                distributionRate {
                    type
                    code
                    description
                    help
                }
                circuitBreaker {
                    type
                    code
                    description
                    help
                }
                priceGas
                annualConsumption {
                    type
                    code
                    description
                    help
                }
                priceVTWithVAT
                priceNTWithVAT
                priceGasWithVAT
                unit
                accountingRegulatedPrice
                monthlyConsumptionFee
                totalPrice
                energyTaxRegulatedPrice
                marketOrganizerRegulatedPrice
                renewableEnergyRegulatedPrice
                distributionPriceByCapacity
                distributionPriceByConsumptionVT
                distributionPriceByConsumptionNT
                distributionPriceByConsumptionGas
                systemServicesRegulatedPrice
                consumptionPriceGas
                consumptionPriceVT
                consumptionPriceNT
                greenEnergy
            }
            supplyPointImportPrices {
                importPricePerKwPowerVT
                importPricePerKwPowerNT
                importPricePerKwGas
                importPriceTotalPerYear
                importPermanentMonthlyPay
            }
        }
    }
    ${offerFragment}
`;
