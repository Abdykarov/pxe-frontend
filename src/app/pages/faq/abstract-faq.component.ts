import { ActivatedRoute } from '@angular/router';

import * as R from 'ramda';
import { combineLatest } from 'rxjs';
import {
    filter,
    tap,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { CONSTS } from 'src/app/app.constants';
import { FaqService } from 'src/app/services/faq.service';
import {
    IQuestion,
    ITagConfigItem,
} from 'src/app/services/model/faq.model';

export class AbstractFaqComponent extends AbstractComponent {
    public readonly CONSTS = CONSTS;

    public activeTag = null;
    public faqConfig: ITagConfigItem[] = null;
    public questions: IQuestion[] = null;

    public loadConfigs$ = combineLatest(
            this.route.params,
            this.faqService.getFaqConfigStream(),
            this.faqService.getQuestionStream(),
        )
        .pipe(
            filter(([params, faqConfig, questions]) => !!(params && faqConfig && questions)),
            tap(([params, faqConfig, questions]) => {
                this.faqConfig = faqConfig;
                this.activeTag = params.tag;
                this.questions = questions;
                return [];
            }),
        );

    constructor(
        public faqService: FaqService,
        public route: ActivatedRoute,
    ) {
        super();
    }
}
