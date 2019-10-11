import gql from 'graphql-tag';

export const listSupplierContractsBasedOnOffersQuery = gql`
    query listSupplierContractsBasedOnOffers(
        $offerId: ID,
        $supplierId: ID,
        $signDateFrom: Date,
        $signDateTo: Date
    ){
        listSupplierContractsBasedOnOffers(
            offerId: $offerId,
            supplierId: $supplierId,
            signDateFrom: $signDateFrom,
            signDateTo: $signDateTo
        ){
            contract {
                contractId,
                contractStatus,
                deliveryFrom,
                deliveryTo,
                offerValidity,
            },
            name,
            ean,
            offerId,
        }
    }
`;
