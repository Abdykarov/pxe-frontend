import { Injectable } from '@angular/core';

import * as R from 'ramda';
import { map } from 'rxjs/operators';

import { ApolloCmsService } from 'src/app/services/apollo-cms.service';
import {
    faqConfigQuery,
    faqQuery,
    questionsQuery,
} from 'src/common/cms/queries/faq';

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

    public getFaqConfig = () => this.apolloCmsService
        .watchQuery({
            query: faqConfigQuery,
        })

    public getFaq = (faqType: string) => this.apolloCmsService
        .fetchQuery(
            {
                query: faqQuery,
            },
            false,
        )
        .pipe(
            map(
                R.find(
                    R.pipe(
                        R.prop('tag'),
                        R.head,
                        R.propEq('type', faqType),
                    ),
                ),
            ),
        )

}
