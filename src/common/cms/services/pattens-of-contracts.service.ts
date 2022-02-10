import { Injectable } from '@angular/core';
import { SubjectTypeLowerCase } from 'src/app/app.constants';
import { patternsOfContractsQuery } from 'src/common/cms/queries/pattens-of-contracts';
import { ApolloCmsService } from 'src/common/services/apollo-cms.service';

@Injectable({
    providedIn: 'root',
})
export class PattensOfContractsService {
    constructor(private apolloCmsService: ApolloCmsService) {}

    public getPatternsOfContracts = (subjectType: SubjectTypeLowerCase) =>
        this.apolloCmsService.fetchQuery({
            query: patternsOfContractsQuery,
            variables: {
                filter: `data/subjectType/iv eq '${subjectType}'`,
            },
        });
}
