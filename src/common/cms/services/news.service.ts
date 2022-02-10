import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { getNewsQuery } from 'src/common/cms/queries/news';
import { normalizeNews } from 'src/common/cms/utils/normalisation';
import { ApolloCmsService } from 'src/common/services/apollo-cms.service';

@Injectable({
    providedIn: 'root',
})
export class NewsService {
    constructor(private apolloCmsService: ApolloCmsService) {}

    public getNews = () =>
        this.apolloCmsService
            .watchQuery({
                query: getNewsQuery,
            })
            .pipe(map(normalizeNews));
}
