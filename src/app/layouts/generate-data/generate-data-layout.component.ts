import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AbstractComponent } from 'src/common/abstract.component';
import { NewsService } from 'src/common/cms/services/news.service';

@Component({
    templateUrl: './generate-data-layout.component.html',
    styleUrls: ['./generate-data-layout.component.scss'],
})
export class GenerateDataLayoutComponent extends AbstractComponent {
    constructor(
        private route: ActivatedRoute,
        private newsService: NewsService
    ) {
        super();
        const dataPage = decodeURIComponent(
            this.route.snapshot.queryParams['page']
        );

        switch (dataPage) {
            case this.ROUTES.ROUTER_DASHBOARD:
                newsService.getNews().subscribe();
                break;
        }
    }
}
