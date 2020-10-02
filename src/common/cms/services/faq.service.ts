import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

import { ApolloCmsService } from 'src/app/services/apollo-cms.service';
import {
    faqConfigQuery,
    questionsQuery,
} from 'src/common/cms/queries/faq';
import {
    normalizeFag,
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
        .pipe(map(normalizeFag))

}
