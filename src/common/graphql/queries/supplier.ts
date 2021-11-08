import { gql } from 'apollo-angular';

export const listSupplierContractsBasedOnOffersQuery = gql`
    query listSupplierContractsBasedOnOffers(
        $filter: ContractsBasedOnOffersFilter
    ) {
        listSupplierContractsBasedOnOffers(filter: $filter) {
            page {
                contract {
                    contractId
                    contractStatus
                    deliveryFrom
                    deliveryTo
                }
                name
                identificationNumber
            }
            totalRecords
        }
    }
`;

export const findSupplierProfileQuery = gql`
    query findSupplierProfile {
        findSupplierProfile {
            numberSeriesPrefix
            numberSeriesVariable
            numberSeriesSuffix
        }
    }
`;
