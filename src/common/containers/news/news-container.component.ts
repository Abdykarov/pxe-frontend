import { Component } from '@angular/core';

import { NewsService } from 'src/common/cms/services/news.service';

@Component({
    selector: 'pxe-news-container',
    templateUrl: './news-container.component.html',
    styleUrls: ['./news-container.component.scss'],
})
export class NewsContainerComponent {

    public $news = this.newsService.getNews();

    constructor(
        private newsService: NewsService,
    ) {}
}
