import gql from 'graphql-tag';

export const findAllSuppliers = gql`
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

export const getCodelistByType = gql`
    query getCodelistByType($type: String!, $locale: String!){
        getCodelistByType(type: $type,locale: $locale){
            type,
            code,
            description,
            help
        }
    }
`;

export const findCodelistsByTypes = gql`
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

export const findSupplierDocumentsByComodity = gql`
    query findSupplierDocumentsByComodity($supplierId: Int, $commodityType:CommodityType){
        findSupplierDocumentsByComodity(supplierId: $supplierId,commodityType:$commodityType){
            type,
            url
        }
    }
`;

export const findSupplyPoints = gql`
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
