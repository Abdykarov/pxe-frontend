import { Injectable } from '@angular/core';

import { ApolloCmsService } from 'src/app/services/apollo-cms.service';
import { patternsOfContractsQuery } from 'src/common/cms/queries/pattens-of-contracts';

@Injectable({
    providedIn: 'root',
})
export class PattensOfContractsService {

    constructor(
        private apolloCmsService: ApolloCmsService,
    ) {}

    public getPatternsOfContracts = () => this.apolloCmsService
        .fetchQuery({
            query: patternsOfContractsQuery,
        })

}
