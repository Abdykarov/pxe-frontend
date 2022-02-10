import { Injectable } from '@angular/core';
import * as R from 'ramda';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CONSTS } from 'src/app/app.constants';
import { FaqService as FaqServiceCms } from 'src/common/cms/services/faq.service';
import { IQuestion, ITagConfigItem } from 'src/common/services/model/faq.model';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class FaqService {
    private faqConfigSubject$: BehaviorSubject<ITagConfigItem[]> =
        new BehaviorSubject(null);
    private questionsSubject$: BehaviorSubject<IQuestion[]> =
        new BehaviorSubject(null);
    public getFaqConfigStream = () => this.faqConfigSubject$.asObservable();
    public getQuestionStream = () => this.questionsSubject$.asObservable();

    constructor(private faqServiceCms: FaqServiceCms) {
        const question$ = this.faqServiceCms.getQuestions().pipe(
            map((questions: IQuestion[]) => {
                const updatedQuestions = R.map((question: IQuestion) => {
                    const { url } = R.head(question.tag);
                    question.absoluteUrl = [
                        '/',
                        CONSTS.PATHS.FAQ,
                        url,
                        question.url,
                    ];
                    return question;
                })([...questions]);

                if (!environment.includeTestData) {
                    return R.reject(R.propEq('isTestData')(true))(
                        updatedQuestions
                    );
                }

                return updatedQuestions;
            })
        );

        combineLatest([question$, this.faqServiceCms.getFaqConfig()]).subscribe(
            ([questions, faqConfig]) => {
                this.faqConfigSubject$.next(<any>faqConfig);
                this.questionsSubject$.next(<any>questions);
            }
        );
    }
}
