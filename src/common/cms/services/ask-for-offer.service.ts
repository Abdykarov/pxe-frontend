import { Injectable } from '@angular/core';

import { ApolloCmsService } from 'src/app/services/apollo-cms.service';
import { getAskForOfferQuery } from '../queries/ask-for-offer';

@Injectable({
    providedIn: 'root',
})
export class AskForOfferCmsService {

    constructor(
        private apolloCmsService: ApolloCmsService,
    ) {}

    public getAskForOffer = () => this.apolloCmsService
        .fetchQuery({
            query: getAskForOfferQuery,
        })
}
