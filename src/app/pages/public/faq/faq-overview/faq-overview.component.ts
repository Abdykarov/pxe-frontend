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
import {
    filter,
    takeUntil,
} from 'rxjs/operators';

import { AbstractFaqComponent } from 'src/app/pages/public/faq/abstract-faq.component';
import { CONSTS } from 'src/app/app.constants';
import { FaqService } from 'src/app/services/faq.service';
import { IQuestion } from 'src/app/services/model/faq.model';
import { FaqComponent } from 'src/app/pages/public/faq/faq.component';
import { ISeo } from 'src/common/cms/models/seo';

@Component({
    selector: 'lnd-faq-overview',
    templateUrl: './faq-overview.component.html',
    styleUrls: ['./faq-overview.component.scss'],
})
export class FaqOverviewComponent extends AbstractFaqComponent {

    constructor(
        private faqComponent: FaqComponent,
        public faqService: FaqService,
        private cd: ChangeDetectorRef,
        private metaService: Meta,
        public route: ActivatedRoute,
        private router: Router,
        private titleService: Title,
    ) {
        super(faqService, route);

        this.loadConfigs$
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                _ => {
                    // Sync s faq.component.ts
                    setTimeout(__ => {
                        const seo: ISeo = R.head(this.faqComponent.faq.seo);
                        this.titleService.setTitle(seo.title);
                        this.metaService.updateTag({
                            name: 'description',
                            content: seo.description,
                        });
                        this.metaService.updateTag({
                            name: 'keywords',
                            content: seo.keywords,
                        });

                        this.questions = R.filter((question: IQuestion) => question.tag[0]?.type === this.activeTag)(this.questions);

                        if (this.questions.length) {
                            this.cd.markForCheck();
                        } else {
                            this.router.navigate([CONSTS.PATHS.FAQ, this.faqConfig[0].url], {replaceUrl: true});
                        }
                    });
                });
    }

    public changeTag = (evt, urlTag: string) => {
        evt.preventDefault();
        this.router.navigate([`${CONSTS.PATHS.FAQ }/${urlTag}`]);
    }
}
