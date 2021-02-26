import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';

import {
    ContractUploadStatus,
    IAskForOfferFilter,
    ISupplyPointGasAttributesImport,
    ISupplyPointImportInput,
    ISupplyPointPowerAttributesImport,
} from 'src/common/graphql/models/ask-for-offer';
import { listAskForOfferQuery } from 'src/common/graphql/queries/ask-for-offer';
import { IResponseDataDocument} from 'src/app/services/model/document.model';
import {saveAs} from 'file-saver';
import {
    createGasSupplyPointImportMutation,
    createPowerSupplyPointImportMutation,
    deleteAskForOfferMutation,
} from 'src/common/graphql/mutation/ask-for-offer';
import {IPaginationConfig} from '../../../app/pages/suppliers/concluded-contracts/concluded-contracts.model';


@Injectable({
    providedIn: 'root',
})
export class AskForOfferService {

    constructor(
        private apollo: Apollo,
    ) {}

    public listAskForOffer = (
        askForOfferFilter: IAskForOfferFilter,
    ) => this.apollo
        .watchQuery<any>({
            query: listAskForOfferQuery,
            variables: {
                filter: askForOfferFilter,
            },
            fetchPolicy: 'network-only',
        })
        .valueChanges

    public documentSave = (data: IResponseDataDocument) => saveAs(data.file, data.filename);

    public createPowerSupplyPointImport = (
        supplyPointImport: ISupplyPointImportInput,
        powerAttributesImport: ISupplyPointPowerAttributesImport,
    ) => this.apollo
        .mutate<any>({
                mutation: createPowerSupplyPointImportMutation,
                variables: {
                    supplyPointImport,
                    powerAttributesImport,
                },
            },
        )


        public createGasSupplyPointImport = (
            supplyPointImport: ISupplyPointImportInput,
            gasAttributesImport: ISupplyPointGasAttributesImport,
        ) => this.apollo
            .mutate<any>({
                mutation: createGasSupplyPointImportMutation,
                variables: {
                    supplyPointImport,
                    gasAttributesImport,
                },
            },
        )

    public deleteAskForOffer = (
        askForOfferId: string,
        paginator,
    ) => this.apollo.mutate<any>({
            mutation: deleteAskForOfferMutation,
            variables: {
                askForOfferId,
            },
            refetchQueries: [
                {
                    query: listAskForOfferQuery,
                    variables: {
                        filter: paginator,
                    },
                },
            ],
        },
    )
}
