import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

import { ApolloCmsService } from 'src/app/services/apollo-cms.service';
import { normalizePatternsOfContracts } from 'src/common/cms/utils/normalisation';
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
        .pipe(map(normalizePatternsOfContracts))

}
