import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';

import {
    ContractUploadStatus,
    IAskForOfferFilter,
    ISupplyPointGasAttributesImport,
    ISupplyPointImportInput,
    ISupplyPointPowerAttributesImport,
} from 'src/common/graphql/models/ask-for-offer';
import {findSupplyPointImportQuery, listAskForOfferQuery} from 'src/common/graphql/queries/ask-for-offer';
import { IResponseDataDocument} from 'src/app/services/model/document.model';
import {saveAs} from 'file-saver';
import {
    createGasSupplyPointImportMutation,
    createPowerSupplyPointImportMutation,
    deleteAskForOfferMutation,
} from 'src/common/graphql/mutation/ask-for-offer';

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
        supplyPoint: ISupplyPointImportInput,
        powerAttributes: ISupplyPointPowerAttributesImport,
    ) => this.apollo
        .mutate<any>({
                mutation: createPowerSupplyPointImportMutation,
                variables: {
                    supplyPoint,
                    powerAttributes,
                },
            },
        )


    public createGasSupplyPointImport = (
        supplyPoint: ISupplyPointImportInput,
        gasAttributes: ISupplyPointGasAttributesImport,
    ) => this.apollo
        .mutate<any>({
            mutation: createGasSupplyPointImportMutation,
            variables: {
                supplyPoint,
                gasAttributes,
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

    public findSupplyPointImport = (
        askForOfferId: string,
    ) => this.apollo
        .query<any>({
                query: findSupplyPointImportQuery,
                variables: {
                    askForOfferId,
                },
            },
        )
}
