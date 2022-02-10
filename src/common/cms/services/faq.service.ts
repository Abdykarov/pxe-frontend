import { Injectable } from '@angular/core';
import {
    faqConfigQuery,
    faqQuery,
    questionsQuery,
} from 'src/common/cms/queries/faq';
import { ApolloCmsService } from 'src/common/services/apollo-cms.service';

@Injectable({
    providedIn: 'root',
})
export class FaqService {
    constructor(private apolloCmsService: ApolloCmsService) {}

    public getQuestions = () =>
        this.apolloCmsService.watchQuery({
            query: questionsQuery,
        });

    public getFaqConfig = () =>
        this.apolloCmsService.watchQuery({
            query: faqConfigQuery,
        });

    public getFaq = () =>
        this.apolloCmsService.fetchQuery(
            {
                query: faqQuery,
            },
            false
        );
}
