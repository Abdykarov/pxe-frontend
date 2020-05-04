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

@Component({
    selector: 'lnd-faq-overview',
    templateUrl: './faq-overview.component.html',
    styleUrls: ['./faq-overview.component.scss'],
})
export class FaqOverviewComponent extends AbstractFaqComponent implements OnInit {

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
    }

    ngOnInit(): void {
        this.loadConfigs$
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                _ => {
                    if (this.questions.length) {
                        this.cd.markForCheck();
                    } else {
                        this.router.navigate([CONSTS.PATHS.FAQ, this.faqConfig[0].url]);
                    }
            });
    }

    public changeTag = (evt, urlTag: string) => {
        evt.preventDefault();
        this.router.navigate([`${CONSTS.PATHS.FAQ }/${urlTag}`]);
    }

}
