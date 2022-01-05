import { Injectable } from '@angular/core';
import { ApolloCmsService } from 'src/app/services/apollo-cms.service';
import { getArticles, getTypes } from 'src/common/cms/queries/blog';

@Injectable({
    providedIn: 'root',
})
export class BlogService {
    constructor(private apolloCmsService: ApolloCmsService) {}

    public getTypes = () =>
        this.apolloCmsService.fetchQuery(
            {
                query: getTypes,
            },
            false
        );

    public getArticles = (skip = 0, type = null) =>
        this.apolloCmsService.fetchQuery(
            {
                query: getArticles,
                variables: {
                    skip,
                    ...(!!type && { filter: `data/typePlain/iv eq '${type}'` }),
                },
            },
            false
        );
}
