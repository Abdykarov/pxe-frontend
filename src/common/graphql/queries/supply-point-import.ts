import gql from 'graphql-tag';
import { supplyPointFragment } from './supply';


export const getCreateUserQuery = gql`
    query {
        createUser @client {
            activeSupplyPoint {
                id,
                name,
                commodityType,
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
                identificationNumber,
                address{
                    street,
                    orientationNumber,
                    descriptiveNumber,
                    city,
                    postCode,
                    region,
                },
                distributionRate{
                    type,
                    code,
                    description,
                    help
                },
                circuitBreaker{
                    type,
                    code,
                    description,
                    help
                },
                phases{
                    type,
                    code,
                    description,
                    help
                },
                annualConsumptionNT,
                annualConsumptionVT,
                annualConsumption,
                annualConsumptionNTUnit,
                annualConsumptionVTUnit,
                annualConsumptionUnit,
                importPricePerKwPowerVT,
                importPricePerKwPowerNT,
                importPricePerKwGas,
                importPriceTotalPerYear,
                importPermanentMonthyPay,
                expirationDate,
                subject{
                    type,
                    code,
                    description,
                    help
                },
                lastAnnualConsumptionNT,
                lastAnnualConsumptionVT,
                lastVersionOfSupplyPoint,
                timeToContractEnd,
                timeToContractEndPeriod {
                    type,
                    code,
                    description,
                    help
                },
                contractEndType {
                    type,
                    code,
                    description,
                    help
                }
                contract {
                    contractId,
                    previousContractId,
                    contractStatus,
                    deliveryFrom,
                    deliveryTo,
                    offer{
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
                        priceVTWithVAT,
                        priceNTWithVAT,
                        priceGasWithVAT,
                        validFrom,
                        validTo,
                        deliveryFrom,
                        deliveryTo,
                        deliveryLength,
                        benefits,
                        priceVT,
                        priceNT,
                        priceGas,
                        accountingRegulatedPrice,
                        consumptionPriceGas,
                        consumptionPriceNT,
                        consumptionPriceVT,
                        distributionPriceByCapacity,
                        distributionPriceByConsumptionNT,
                        distributionPriceByConsumptionVT,
                        energyTaxRegulatedPrice,
                        marketOrganizerRegulatedPrice,
                        monthlyConsumptionFee,
                        renewableEnergyRegulatedPrice,
                        systemServicesRegulatedPrice,
                        distributionPriceByConsumptionGas,
                        totalPrice,
                        unit,
                        greenEnergy
                    },
                    personalData {
                        name,
                        signatoryName,
                        signatorySurname,
                        signatoryPosition,
                        birthDate,
                        ico,
                        dic,
                        address1{
                            street,
                            orientationNumber,
                            descriptiveNumber,
                            city,
                            postCode,
                            region,
                        },
                        address2{
                            street,
                            orientationNumber,
                            descriptiveNumber,
                            city,
                            postCode,
                            region,
                        },
                        email,
                        phone,
                        bankAccountNumber,
                        bankCode,
                        depositPaymentType {
                            type,
                            code,
                            description,
                            help
                        },
                        deposit,
                    },
                    prolong,
                },
                imported,
                progressStatus,
                allowedOperations,
            }
        }
    }
`;


export const findSupplyPointImportsQuery = gql`
    query findSupplyPointImports($askForOfferId: ID!, $skipInfoAboutRelationContracts: Boolean = true, $skipOfferValidity: Boolean = true){
        findSupplyPointImports(askForOfferId: $askForOfferId){
            ...SupplyPointFragment
        }
    }
    ${supplyPointFragment}
`;
