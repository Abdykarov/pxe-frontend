import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as R from 'ramda';
import { BehaviorSubject } from 'rxjs';
import {
    map,
    switchMap,
} from 'rxjs/operators';

import { CONSTS } from 'src/app/app.constants';
import { geParamFromTag } from 'src/common/utils';
import { environment } from 'src/environments/environment';
import {
    IQuestion,
    ITagConfigItem,
} from 'src/app/services/model/faq.model';

@Injectable({
    providedIn: 'root',
})
export class FaqService {
    private faqConfig = null;
    private faqConfigSubject$: BehaviorSubject<ITagConfigItem[]> = new BehaviorSubject(null);
    private questionsSubject$: BehaviorSubject<IQuestion[]> = new BehaviorSubject(null);
    public getFaqConfigStream = () => this.faqConfigSubject$.asObservable();
    public getQuestionStream = () => this.questionsSubject$.asObservable();

    constructor(
        private http: HttpClient,
    ) {
        http.get('assets/static-data/faq.json')
            .pipe(
                switchMap((faqConfig: ITagConfigItem[]) => {
                    this.faqConfig = faqConfig;
                    return http.get('assets/static-data/questions.json');
                }),
                map((questions: IQuestion[]) => {
                    questions = R.map( (question: IQuestion) => {
                        question.absoluteUrl = ['/', CONSTS.PATHS.FAQ, geParamFromTag(question.tag, this.faqConfig, 'url'), question.url];
                        return question;
                    })(questions);

                    if (!environment.includeTestData) {
                        return R.reject(R.propEq('isTestData')(true))(questions);
                    }

                    return questions;
                }),
            )
            .subscribe((questions: IQuestion[]) => {
                this.faqConfigSubject$.next(this.faqConfig);
                this.questionsSubject$.next(questions);
            });
    }
}
