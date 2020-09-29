import { Injectable } from '@angular/core';

import * as R from 'ramda';
import { map } from 'rxjs/operators';

import { ApolloCmsService } from '../../../app/services/apollo-cms.service';
import { getNewsQuery } from 'src/common/cms/queries/news';
import { compareDates } from 'src/common/utils';

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
            map(({news}) => R.sort((first, second) => compareDates(first.date, second.date, false))(news)),
        )

}
