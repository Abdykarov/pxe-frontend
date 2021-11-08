import { gql } from 'apollo-angular';

export const createSupplyPointImportMutation = gql`
    mutation createSupplyPointImport(
        $askForOfferId: ID!
        $supplyPoint: SupplyPointInputImport!
    ) {
        createSupplyPointImport(
            askForOfferId: $askForOfferId
            supplyPoint: $supplyPoint
        ) {
            id
            name
            commodityType
            supplier {
                id
                name
                vatNumber
                logoPath
                sampleDocuments {
                    type
                    url
                }
            }
            identificationNumber
            address {
                street
                orientationNumber
                descriptiveNumber
                city
                postCode
                region
            }
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
            phases {
                type
                code
                description
                help
            }
            annualConsumptionNT
            annualConsumptionVT
            annualConsumption
            annualConsumptionNTUnit
            annualConsumptionVTUnit
            annualConsumptionUnit
            importPricePerKwPowerVT
            importPricePerKwPowerNT
            importPricePerKwGas
            importPriceTotalPerYear
            importPermanentMonthlyPay
            expirationDate
            subject {
                type
                code
                description
                help
            }
            lastAnnualConsumptionNT
            lastAnnualConsumptionVT
            lastVersionOfSupplyPoint
            timeToContractEnd
            timeToContractEndPeriod {
                type
                code
                description
                help
            }
            withoutSupplier
            contractEndType {
                type
                code
                description
                help
            }
            contract {
                contractId
                previousContractId
                contractStatus
                deliveryFrom
                deliveryTo
                offer {
                    supplier {
                        id
                        name
                        vatNumber
                        logoPath
                        sampleDocuments {
                            type
                            url
                        }
                    }
                    commodityType
                    name
                    priceVTWithVAT
                    priceNTWithVAT
                    priceGasWithVAT
                    validFrom
                    validTo
                    deliveryFrom
                    deliveryTo
                    deliveryLength
                    benefits
                    priceVT
                    priceNT
                    priceGas
                    accountingRegulatedPrice
                    consumptionPriceGas
                    consumptionPriceNT
                    consumptionPriceVT
                    distributionPriceByCapacity
                    distributionPriceByConsumptionNT
                    distributionPriceByConsumptionVT
                    energyTaxRegulatedPrice
                    marketOrganizerRegulatedPrice
                    monthlyConsumptionFee
                    renewableEnergyRegulatedPrice
                    systemServicesRegulatedPrice
                    distributionPriceByConsumptionGas
                    totalPrice
                    unit
                    greenEnergy
                }
                personalData {
                    name
                    signatoryName
                    signatorySurname
                    signatoryPosition
                    birthDate
                    ico
                    dic
                    address1 {
                        street
                        orientationNumber
                        descriptiveNumber
                        city
                        postCode
                        region
                    }
                    address2 {
                        street
                        orientationNumber
                        descriptiveNumber
                        city
                        postCode
                        region
                    }
                    email
                    phone
                    bankAccountNumber
                    bankCode
                    depositPaymentType {
                        type
                        code
                        description
                        help
                    }
                    deposit
                }
                prolong
            }
            imported
            progressStatus
            allowedOperations
        }
    }
`;

export const setActiveSupplyPointMutation = gql`
    mutation setActiveSupplyPoint($supplyPoint: SupplyPoint) {
        setActiveSupplyPoint(supplyPoint: $supplyPoint) @client
    }
`;

export const deleteSupplyPointImportMutation = gql`
    mutation deleteSupplyPointImport($supplyPointImportId: ID) {
        deleteSupplyPointImport(supplyPointImportId: $supplyPointImportId)
    }
`;
