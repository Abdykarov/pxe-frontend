import { Injectable } from '@angular/core';

import * as moment from 'moment';
import * as R from 'ramda';

import { ApolloCmsService } from './apollo-cms.service';
import { getNewsQuery } from 'src/common/cms/queries/news';
import { map } from 'rxjs/operators';
import { INews } from '../../ui/news/model/news.model';

@Injectable({
    providedIn: 'root',
})
export class NewsService {

    constructor(
        private apolloCmsService: ApolloCmsService,
    ) {}

    public getNews = () => this.apolloCmsService
        .watchQuery({
            query: getNewsQuery,
        })
        .pipe(
            map((data: INews) => {
                return R.sort((a, b) => {
                    return moment(a.date).isAfter(b.date) ? -1 : 2;
                })(data.news);
            }),
        )

}
