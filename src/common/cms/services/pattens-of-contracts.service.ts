import { Injectable } from '@angular/core';
import { SubjectTypeLowerCase } from 'src/app/app.constants';
import { ApolloCmsService } from 'src/app/services/apollo-cms.service';
import { patternsOfContractsQuery } from 'src/common/cms/queries/pattens-of-contracts';

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
