import gql from 'graphql-tag';

export const addressFragment = gql`
    fragment addressFragment on Address {
        street,
        orientationNumber,
        descriptiveNumber,
        city,
        postCode,
        region,
    }
`;

export const supplyPointFragment = gql`
        fragment SupplyPointFragment on SupplyPoint {
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
            ean,
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
                contractStatus,
                deliveryFrom,
                deliveryTo,
                offerValidity,
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
                    totalPrice,
                    unit,
                    prepayment,
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
            },
            progressStatus,
            allowedOperations,
        }
    `;

export const findAllSuppliersQuery = gql`
    query findAllSuppliers($commodityType:CommodityType){
        findAllSuppliers(commodityType:$commodityType){
            id,
            name,
            vatNumber,
            logoPath,
            sampleDocuments{
                type,
                url,
            }
        }
    }
`;

export const getCodelistByTypeQuery = gql`
    query getCodelistByType($type: String!, $locale: String!){
        getCodelistByType(type: $type,locale: $locale){
            type,
            code,
            description,
            help
        }
    }
`;

export const findCodelistsByTypesQuery = gql`
    query findCodelistsByTypes($types: [String]!, $locale: String!){
        findCodelistsByTypes(types: $types,locale: $locale){
            codelistType,
            codelistItems{
                type,
                code,
                description,
                help
            }
        }
    }
`;

export const findSupplierDocumentsByComodityQuery = gql`
    query findSupplierDocumentsByComodity($supplierId: Int, $commodityType:CommodityType){
        findSupplierDocumentsByComodity(supplierId: $supplierId,commodityType:$commodityType){
            type,
            url
        }
    }
`;

export const findSupplyPointsQuery = gql`
    query findSupplyPoints($ean: String){
        findSupplyPoints(ean: $ean){
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
            contract {
                contractId,
                contractStatus,
                deliveryFrom,
                deliveryTo,
                offerValidity,
            },
            ean,
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
            annualConsumptionNT,
            expirationDate,
            subject{
                type,
                code,
                description,
                help,
            }
            lastAnnualConsumptionNT,
            lastAnnualConsumptionVT,
            progressStatus,
            allowedOperations,
        }
    }
`;

export const getSupplyPointQuery = gql`
    query getSupplyPoint($supplyPointId: ID!){
        getSupplyPoint(supplyPointId: $supplyPointId){
            ...SupplyPointFragment
        }
    }
    ${supplyPointFragment}
`;

export const findSupplyPointsByContractStatusQuery = gql`
    query findSupplyPointsByContractStatus($ean: String, $contractStatus: [ContractStatus]!){
        findSupplyPointsByContractStatus(ean: $ean, contractStatus: $contractStatus){
            ...SupplyPointFragment
        }
    }
    ${supplyPointFragment}
`;

export const computeAndGetSupplyPointStatisticsQuery = gql`
    query computeAndGetSupplyPointStatistics {
        computeAndGetSupplyPointStatistics {
            gasAnnualConsumptionSum,
            gasCount,
            notConcludedCount,
            notConcludedItems {
                id,
                name,
                commodityType,
                progressStatus,
            },
            powerAnnualConsumptionSum,
            powerCount,
            showDeliveryCount,
            showDeliveryItems {
                id,
                name,
                commodityType,
                progressStatus,
            },
            concludedCount,
            concludedItems {
                id,
                name,
                commodityType,
                progressStatus,
            }
        }
    }
`;

export const getSupplyPointGlobalStatisticsQuery = gql`
    query getSupplyPointGlobalStatistics($includeHistoryData: Boolean){
        getSupplyPointGlobalStatistics(includeHistoryData:$includeHistoryData) {
            gasOfferCount,
            powerOfferCount,
            gasDeliveryCount,
            powerDeliveryCount,
            totalPossibleDeliveryCountGas,
            totalPossibleDeliveryCountPower,
        }
    }

`;
