import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';
import { saveAs } from 'file-saver';

import {
    deleteAskForOfferMutation,
    finalizeAskForOfferMutation,
} from 'src/common/graphql/mutation/ask-for-offer';
import { IAskForOfferFilter } from 'src/common/graphql/models/ask-for-offer';
import { IResponseDataDocument} from 'src/app/services/model/document.model';
import { listAskForOfferQuery } from 'src/common/graphql/queries/ask-for-offer';

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

    public finalizeAskForOffer = (askForOfferId: string) => this.apollo.mutate<any>({
        mutation: finalizeAskForOfferMutation,
        variables: {
            askForOfferId,
        },
    })
}
