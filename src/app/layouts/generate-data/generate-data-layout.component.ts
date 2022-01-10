import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FaqService } from 'src/app/services/faq.service';
import { AbstractComponent } from 'src/common/abstract.component';
import { NewsService } from 'src/common/cms/services/news.service';

@Component({
    templateUrl: './generate-data-layout.component.html',
    styleUrls: ['./generate-data-layout.component.scss'],
})
export class GenerateDataLayoutComponent extends AbstractComponent {
    constructor(
        private route: ActivatedRoute,
        private newsService: NewsService,
        public faqService: FaqService
    ) {
        super();
        const dataPage = decodeURIComponent(this.route.snapshot.params['page']);

        switch (dataPage) {
            case this.ROUTES.ROUTER_DASHBOARD:
                newsService.getNews().subscribe();
                break;
            case this.ROUTES.ROUTER_REQUEST_CONTRACT:
            case this.ROUTES.ROUTER_REQUEST_OFFER_SELECTION:
                this.faqService.getFaqConfigStream().subscribe();
                this.faqService.getQuestionStream().subscribe();
                break;
        }
    }
}
