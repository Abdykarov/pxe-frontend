import { Injectable } from '@angular/core';

import { ApolloCmsService } from 'src/app/services/apollo-cms.service';
import {
    getTypes,
    getArticles,
    getLpArticles,
} from 'src/common/cms/queries/blog';

@Injectable({
    providedIn: 'root',
})
export class BlogService {

    constructor(
        private apolloCmsService: ApolloCmsService,
    ) {}

    public getTypes = () => this.apolloCmsService
        .fetchQuery({
                query: getTypes,
            },
            false,
        )

    public getArticles = (skip = 0, type = null) => this.apolloCmsService
        .fetchQuery({
                query: getArticles,
                variables: {
                    skip,
                    ...(!!type) && {filter: `data/typePlain/iv eq '${type}'`},
                },
            },
            false,
        )

    public getLpArticles = () => this.apolloCmsService
        .fetchQuery({
                query: getLpArticles,
            },
            false,
        )
}
