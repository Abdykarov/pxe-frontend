import {
    ActivatedRoute,
    Router,
} from '@angular/router';
import {
    ChangeDetectorRef,
    Component,
} from '@angular/core';
import {
    Meta,
    Title,
} from '@angular/platform-browser';

import * as R from 'ramda';
import { takeUntil } from 'rxjs/operators';

import { AbstractFaqComponent } from 'src/app/pages/public/faq/abstract-faq.component';
import {
    CONSTS,
    SEO,
} from 'src/app/app.constants';
import { FaqService } from 'src/app/services/faq.service';
import { IQuestion } from 'src/app/services/model/faq.model';

@Component({
    selector: 'lnd-faq-overview',
    templateUrl: './faq-overview.component.html',
    styleUrls: ['./faq-overview.component.scss'],
})
export class FaqOverviewComponent extends AbstractFaqComponent {

    constructor(
        public faqService: FaqService,
        private cd: ChangeDetectorRef,
        private metaService: Meta,
        public route: ActivatedRoute,
        private router: Router,
        private titleService: Title,
    ) {
        super(faqService, route);
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

        this.loadConfigs$
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                _ => {
                    this.questions = R.filter((tag: IQuestion) => tag.tag === this.activeTag, this.questions);
                    if (this.questions.length) {
                        this.cd.markForCheck();
                    } else {
                        this.router.navigate([CONSTS.PATHS.FAQ, this.faqConfig[0].url], {replaceUrl: true});
                    }
                });
    }

    public changeTag = (evt, urlTag: string) => {
        evt.preventDefault();
        this.router.navigate([`${CONSTS.PATHS.FAQ }/${urlTag}`]);
    }
}
