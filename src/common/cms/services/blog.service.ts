import { Injectable } from '@angular/core';

import { ApolloCmsService } from 'src/app/services/apollo-cms.service';
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

    public getLpArticles = () => this.apolloCmsService
        .fetchQuery({
                query: getLpArticles,
            },
            false,
        )
}
