import {
    ChangeDetectorRef,
    Component, OnInit,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import * as R from 'ramda';
import { combineLatest } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';
import { CONSTS } from 'src/app/app.constants';
import { FaqService } from 'src/app/services/faq.service';
import { IQuestion, ITagConfigItem } from 'src/app/services/model/faq.model';

import { AbstractComponent } from 'src/common/abstract.component';

export class AbstractFaqComponent extends AbstractComponent {
    public activeTag = null;
    public readonly CONSTS = CONSTS;
    public faqConfig: ITagConfigItem[] = null;
    public questions: IQuestion[] = null;
    public combineLeast$ = combineLatest(
            this.route.params,
            this.faqService.getFaqConfigStream(),
            this.faqService.getQuestionStream(),
        )
        .pipe(
            filter(([params, faqConfig, questions]) => !!(params && faqConfig && questions)),
            tap(([params, faqConfig, questions]) => {
                this.faqConfig = faqConfig;
                this.questions = questions;
                this.activeTag = params.tag;
                this.questions = R.filter((tag: IQuestion) => tag.tag === this.activeTag, this.questions);
                return [params];
            }),
        );

    constructor(
        public faqService: FaqService,
        public route: ActivatedRoute,
    ) {
        super();
    }
}
