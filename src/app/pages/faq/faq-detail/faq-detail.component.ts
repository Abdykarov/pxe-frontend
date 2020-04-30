import {
    Component,
    OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { CONSTS } from 'src/app/app.constants';
import { AbstractFaqComponent } from 'src/app/pages/faq/abstract-faq.component';
import { IQuestion } from 'src/app/services/model/faq.model';
import * as R from 'ramda';

import { AbstractComponent } from 'src/common/abstract.component';
import { FaqService } from 'src/app/services/faq.service';

@Component({
    selector: 'lnd-faq-detail',
    templateUrl: './faq-detail.component.html',
    styleUrls: ['./faq-detail.component.scss'],
})
export class FaqDetailComponent extends AbstractFaqComponent implements OnInit {

    public activeQuestion: IQuestion = null;

    constructor(
        public faqService: FaqService,
        public route: ActivatedRoute,
        public router: Router,
    ) {
        super(faqService, route);
    }

    ngOnInit() {
        super.ngOnInit();
        this.combineLeast$
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(
                ([params]) => {
                    this.activeQuestion = R.pipe(
                        R.curry(this.setActiveQuestion)(params),
                        R.head,
                    )(this.questions);
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
