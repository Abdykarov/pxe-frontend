import gql from 'graphql-tag';

export const listAskForOfferQuery = gql`
    query listAskForOffer($filter: AskForOfferFilter!){
        listAskForOffer(filter: $filter){
            page {
                id,
                createdAt,
                status,
                email,
                files {
                    id,
                    fileName,
                },
            }
            totalRecords,

        }
    }
`;

export const findSupplyPointImportQuery = gql`
    query findSupplyPointImport($askForOfferId: ID!){
        findSupplyPointImport(askForOfferId: $askForOfferId){
            id,
            askForOfferId,
            supplierId,
            name,
            expirationDate,
            subjectTypeId,
            contractEndTypeId,
            timeToContractEnd,
            timeToContractEndPeriodId,
            address{
                street,
                orientationNumber,
                descriptiveNumber,
                city,
                postCode,
                region,
            },
            supplyPointPowerAttributes{
                ean,
                circuitBreakerId,
                phasesId,
                distributionRateId,
                annualConsumptionNT,
                annualConsumptionNTUnit,
                annualConsumptionVT,
                annualConsumptionVTUnit,
            },
            supplyPointGasAttributes{
                eic,
                annualConsumption,
                annualConsumptionUnit,
            },
            personalData {
                name,
                ico,
                dic,
                birthDate,
                email,
                phone,
                bankAccountNumber,
                bankCode,
                depositPaymentTypeId,
                deposit,
                signatoryName,
                signatorySurname,
                signatoryPosition,
                address1 {
                    street,
                    orientationNumber,
                    descriptiveNumber,
                    city,
                    postCode,
                    region,
                },
                address2 {
                    street,
                    orientationNumber,
                    descriptiveNumber,
                    city,
                    postCode,
                    region,
                },

            }
        }
    }
`;
