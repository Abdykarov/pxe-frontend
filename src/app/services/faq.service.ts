import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

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
        private http: HttpClient,
    ) {
        http.get('assets/static-data/faq.json').subscribe((faqConfig: ITagConfigItem[]) => {
            this.faqConfigSubject$.next(faqConfig);
        });
        http.get('assets/static-data/questions.json').subscribe((questions: IQuestion[]) => {
            this.questionsSubject$.next(questions);
        });
    }
}
