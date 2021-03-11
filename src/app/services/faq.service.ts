import { Injectable } from '@angular/core';

import * as R from 'ramda';
import {
    BehaviorSubject,
    combineLatest,
} from 'rxjs';
import { map } from 'rxjs/operators';

import { CONSTS } from 'src/app/app.constants';
import { environment } from 'src/environments/environment';
import { FaqService as FaqServiceCms } from 'src/common/cms/services/faq.service';
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
                    const updatedQuestions = R.map( (question: IQuestion) => {
                        question.absoluteUrl = ['/', CONSTS.PATHS.FAQ, question.tag.url, question.url];
                        return question;
                    })([...questions]);

                    if (!environment.includeTestData) {
                        return R.reject(R.propEq('isTestData')(true))(updatedQuestions);
                    }

                    return updatedQuestions;
                }),
            );

        combineLatest([question$, this.faqServiceCms.getFaqConfig()])
            .subscribe(([questions, faqConfig]) => {
                this.faqConfigSubject$.next(<any>faqConfig);
                this.questionsSubject$.next(<any>questions);
            });
    }
}
