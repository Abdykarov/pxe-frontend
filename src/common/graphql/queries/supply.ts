import gql from 'graphql-tag';

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
        }
    }
`;

export const getSupplyPointQuery = gql`
    query getSupplyPoint($supplyPointId: ID!){
        getSupplyPoint(supplyPointId: $supplyPointId){
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
            timeToContractEnd,
            timeToContractEndPeriod {
                type,
                code,
                description,
                help
            },
            contract {
                contractId,
                contractStatus,
                deliveryFrom,
                deliveryTo,
                offer{
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
                    deliveryTo,
                    deliveryLength,
                    benefits,
                    priceVT,
                    priceNT,
                    priceGas,
                    mountlyPaymentPrice,
                },
                personalData {
                    name,
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
                }
            },
        }
    }
`;
