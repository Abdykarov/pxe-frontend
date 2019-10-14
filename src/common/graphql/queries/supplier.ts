import gql from 'graphql-tag';

export const listSupplierContractsBasedOnOffersQuery = gql`
    query listSupplierContractsBasedOnOffers(
        $filter: ContractsBasedOnOffersFilter,
        $paginationFilter: PaginationFilter,
    ){
        listSupplierContractsBasedOnOffers(
            filter: $filter,
            paginationFilter: $paginationFilter,
        ){
            contractsWithNameAndEan {
                contract {
                    contractId,
                    contractStatus,
                    deliveryFrom,
                    deliveryTo,
                },
                name,
                ean,
            }
            totalRecords,
        }
    }
`;
