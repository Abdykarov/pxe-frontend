import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

import { ApolloCmsService } from 'src/app/services/apollo-cms.service';
import {
    faqConfigQuery,
    faqQuery,
    questionsQuery,
} from 'src/common/cms/queries/faq';
import {
    normalizeFag,
    normalizeFagConfig,
    normalizeQuestions,
} from 'src/common/cms/utils/normalisation';

@Injectable({
    providedIn: 'root',
})
export class FaqService {

    constructor(
        private apolloCmsService: ApolloCmsService,
    ) {}

    public getQuestions = () => this.apolloCmsService
        .watchQuery({
            query: questionsQuery,
        })
        .pipe(map(normalizeQuestions))

    public getFaqConfig = () => this.apolloCmsService
        .watchQuery({
            query: faqConfigQuery,
        })
        .pipe(map(normalizeFagConfig))

    public getFaq = () => this.apolloCmsService
        .fetchQuery({
            query: faqQuery,
        })
        .pipe(map(normalizeFag))

}
