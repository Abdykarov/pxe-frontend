import {
    ActivatedRoute,
    Router,
} from '@angular/router';
import {
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import {
    Meta,
    Title,
} from '@angular/platform-browser';

import * as R from 'ramda';
import { takeUntil } from 'rxjs/operators';

import { AbstractFaqComponent } from 'src/app/pages/faq/abstract-faq.component';
import {
    CONSTS,
    ROUTES,
    SEO,
} from 'src/app/app.constants';
import { FaqService } from 'src/app/services/faq.service';
import {
    IQuestion,
    ITagConfigItem,
} from 'src/app/services/model/faq.model';
import {
    removeHtmlFromText,
    truncateText,
} from 'src/common/utils';

@Component({
    selector: 'lnd-faq-detail',
    templateUrl: './faq-detail.component.html',
    styleUrls: ['./faq-detail.component.scss'],
})
export class FaqDetailComponent extends AbstractFaqComponent implements OnInit {
    private readonly countOfNextQuestions = 3;
    private readonly maxLengthOFMetaDescription = 150;
    public activeQuestion: IQuestion = null;
    public activeTagLabel = '';

    constructor(
        private cd: ChangeDetectorRef,
        public faqService: FaqService,
        private metaService: Meta,
        public route: ActivatedRoute,
        public router: Router,
        private titleService: Title,
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

                    if (!this.activeQuestion) {
                        this.router.navigate([CONSTS.PATHS.NOT_FOUND]);
                    }

                    this.activeTagLabel =
                        this.faqConfig.find((faqConfig: ITagConfigItem) => faqConfig.type === this.activeQuestion.tag).label;
                    this.questions = R.pipe(
                        R.filter((question: IQuestion) => question.id !== this.activeQuestion.id && question.tag === this.activeTag),
                        this.sortQuestions,
                        R.take(this.countOfNextQuestions),
                    )(this.questions);
                    this.titleService.setTitle(`${this.activeQuestion.header} | PARC4U`);
                    this.metaService.updateTag({
                        name: 'description',
                        content: R.pipe(
                            removeHtmlFromText,
                            R.curry(truncateText)(this.maxLengthOFMetaDescription)(CONSTS.APPEND_AFTER_CUT_TEXT),
                        )(this.activeQuestion.shortContent),
                    });
                    this.metaService.updateTag({
                        name: 'keywords',
                        content: this.activeQuestion.seoKeywords,
                    });
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

    private sortFnc = (numbers: number[]): number[] => R.sort((first: number, second: number) => first - second)(numbers);

    private sortQuestions = (questions: IQuestion[]) => R.pipe(
        R.partition((question: IQuestion) => question.id < this.activeQuestion.id),
        ([firstGroup, secondGroup]) => ([this.sortFnc(firstGroup), this.sortFnc(secondGroup)]),
        ([firstGroup, secondGroup]) => [...secondGroup, ...firstGroup],
    )(questions)
}
