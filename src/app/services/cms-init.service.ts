import { Injectable } from '@angular/core';

import { NewsService } from 'src/common/cms/services/news.service';

@Injectable({
    providedIn: 'root',
})
export class CmsInitService {
    private initializedSecured = false;
    private initializedPublic = false;

    constructor(
        private news: NewsService,
    ) {}

    public securedInit = () => {
        if (!this.initializedSecured) {
            this.initializedSecured = true;
            this.news.getNews().subscribe();
        }
    }

    public publicInit = () => {
        if (!this.initializedPublic) {
            this.initializedPublic = true;
        }
    }
}
