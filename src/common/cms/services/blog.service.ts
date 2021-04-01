import { Injectable } from '@angular/core';

import * as R from 'ramda';
import { map } from 'rxjs/operators';

import { ApolloCmsService } from 'src/app/services/apollo-cms.service';
import { compareDates } from 'src/common/utils';
import {
    getBlog,
    getLpArticles,
} from 'src/common/cms/queries/blog';

@Injectable({
    providedIn: 'root',
})
export class BlogService {

    constructor(
        private apolloCmsService: ApolloCmsService,
    ) {}

    public getBlog = () => this.apolloCmsService
        .fetchQuery({
            query: getBlog,
        })
        .pipe(
            map((data: any) => {
                data.articles = R.sort(
                    (first, second) => compareDates(first.date, second.date, false),
                    data.articles,
                );
                return data;
            }),
        )

    public getLpArticles = () => this.apolloCmsService
        .fetchQuery({
                query: getLpArticles,
            },
            false,
        )
}
