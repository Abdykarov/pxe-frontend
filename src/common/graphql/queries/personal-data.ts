import gql from 'graphql-tag';
import { IAddress, ICodelistItem } from '../models/supply.model';

export const getPersonalData = gql`
    query getPersonalData($contractId: Int!){
        findSupplyPointOffers(contractId: $contractId){
            name,
            ico,
            dic,
            address1: {
                street,
                orientationNumber,
                descriptiveNumber,
                city,
                postCode,
                region,
            },
            address2: {
                street,
                orientationNumber,
                descriptiveNumber,
                city,
                postCode,
                region,
            }
            email,
            phone,
            bankAccountNumber,
            bankCode,
            depositPaymentType: {
                type,
                code,
                description,
                help,
            },
            deposit,
        }
    }
`;
