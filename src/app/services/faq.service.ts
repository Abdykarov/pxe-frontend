import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as R from 'ramda';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { FaqService as FaqServiceCms } from '../../common/cms/services/faq.service';
import { CONSTS } from 'src/app/app.constants';
import { environment } from 'src/environments/environment';
import {
    IQuestion,
    ITagConfigItem,
} from 'src/app/services/model/faq.model';

@Injectable({
    providedIn: 'root',
})
export class FaqService {
    private faqConfigSubject$: BehaviorSubject<ITagConfigItem[]> = new BehaviorSubject(null);
    private questionsSubject$: BehaviorSubject<IQuestion[]> = new BehaviorSubject(null);
    public getFaqConfigStream = () => this.faqConfigSubject$.asObservable();
    public getQuestionStream = () => this.questionsSubject$.asObservable();

    constructor(
        private faqServiceCms: FaqServiceCms,
    ) {
        const question$ = this.faqServiceCms.getQuestions()
            .pipe(
                map((questions: IQuestion[]) => {
                    const data  = R.map( (question: IQuestion) => {
                        question.absoluteUrl = ['/', CONSTS.PATHS.FAQ, question.tag.url, question.url];
                        return question;
                    })([...questions]);

                    if (!environment.includeTestData) {
                        return R.reject(R.propEq('isTestData')(true))(data);
                    }

                    return data;
                }),
            );

        combineLatest([question$, this.faqServiceCms.getFaqConfig()])
            .subscribe(([questions, faqConfig]) => {
                this.faqConfigSubject$.next(<any>faqConfig);
                this.questionsSubject$.next(<any>questions);
            });
    }
}
