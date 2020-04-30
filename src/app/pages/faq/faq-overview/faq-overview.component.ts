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
import { IQuestion } from 'src/app/pages/faq/faq.model';

@Component({
    selector: 'lnd-faq-overview',
    templateUrl: './faq-overview.component.html',
    styleUrls: ['./faq-overview.component.scss'],
})
export class FaqOverviewComponent extends AbstractFaqComponent implements OnInit {
    public activeTag = null;

    constructor(
        private cd: ChangeDetectorRef,
        private metaService: Meta,
        private route: ActivatedRoute,
        private router: Router,
        private titleService: Title,
    ) {
        super();
        this.titleService.setTitle(CONSTS.TITLES.FAQ);
        this.metaService.updateTag({
            name: 'description',
            content: SEO.META_DESCRIPTION.FAQ,
        });
        this.metaService.updateTag({
            name: 'keywords',
            content: [
                ...SEO.META_KEYWORDS.LANDING_PAGE,
                ...SEO.META_KEYWORDS.FAQ,
            ].toString(),
        });
    }

    ngOnInit(): void {
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.route.params
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(params => {
                this.activeTag = params.tag;
                this.questions = R.filter((tag: IQuestion) => tag.tag === this.activeTag, this.questions);
                if (this.questions.length) {
                    this.cd.markForCheck();
                } else {
                    this.router.navigate([CONSTS.PATHS.NOT_FOUND]);
                }
            });
    }

    public changeTag = (evt, urlTag: string) => {
        evt.preventDefault();
        this.router.navigate([`${CONSTS.PATHS.FAQ }/${urlTag}`]);
    }

}
