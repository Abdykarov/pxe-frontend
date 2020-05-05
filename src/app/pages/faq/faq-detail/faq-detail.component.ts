import {
    ActivatedRoute,
    Router,
} from '@angular/router';
import {
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';

import * as R from 'ramda';
import { takeUntil } from 'rxjs/operators';

import { AbstractFaqComponent } from 'src/app/pages/faq/abstract-faq.component';
import { CONSTS } from 'src/app/app.constants';
import { FaqService } from 'src/app/services/faq.service';
import { IQuestion } from 'src/app/services/model/faq.model';

@Component({
    selector: 'lnd-faq-detail',
    templateUrl: './faq-detail.component.html',
    styleUrls: ['./faq-detail.component.scss'],
})
export class FaqDetailComponent extends AbstractFaqComponent implements OnInit {
    private sicilianQuestionsToShow = 3;
    public activeQuestion: IQuestion = null;

    constructor(
        private cd: ChangeDetectorRef,
        public faqService: FaqService,
        public route: ActivatedRoute,
        public router: Router,
    ) {
        super(faqService, route);
    }

    ngOnInit() {
        super.ngOnInit();
        this.loadConfigs$
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                ([params]) => {
                    this.activeQuestion = R.pipe(
                        R.curry(this.setActiveQuestion)(params),
                        R.head,
                    )(this.questions);
                    this.questions = R.pipe(
                        R.filter((question: IQuestion) => question.id !== this.activeQuestion.id && this.activeQuestion.id ),
                        R.sort(
                            (firstQuestion, secondQuestion) => firstQuestion.id - secondQuestion.id -
                                (secondQuestion.id < this.activeQuestion.id ? Number.MAX_VALUE : 0),
                        ),
                    )(this.questions);
                    this.cd.markForCheck();
                });
    }

    public routerToOverview = (evt) => {
        evt.preventDefault();
        this.router.navigate([CONSTS.PATHS.FAQ, this.activeTag]);
    }

    private setActiveQuestion = (params, questions: IQuestion[]) => R.filter(
            (question: IQuestion) => question.tag === this.activeTag && question.url === params.url,
        )(questions)
}
