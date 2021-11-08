import { Directive } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { FaqService } from 'src/app/services/faq.service';
import { IQuestion, ITagConfigItem } from 'src/app/services/model/faq.model';
import { AbstractComponent } from 'src/common/abstract.component';

@Directive()
export class AbstractFaqComponent extends AbstractComponent {
    public activeTag = null;
    public faqConfig: ITagConfigItem[] = null;
    public questions: IQuestion[] = null;

    public loadConfigs$ = combineLatest([
        this.route.params,
        this.faqService.getFaqConfigStream(),
        this.faqService.getQuestionStream(),
    ]).pipe(
        filter(
            ([params, faqConfig, questions]) =>
                !!(params && faqConfig && questions)
        ),
        tap(([params, faqConfig, questions]) => {
            this.faqConfig = faqConfig;
            this.activeTag = params.tag;
            this.questions = questions;
        })
    );

    constructor(public faqService: FaqService, public route: ActivatedRoute) {
        super();
    }
}
