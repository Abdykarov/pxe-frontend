import { Injectable } from '@angular/core';
import { getArticles, getTypes } from 'src/common/cms/queries/blog';
import { ApolloCmsService } from 'src/common/services/apollo-cms.service';

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

    public getArticles = (skip = 0, type, page: string = null) =>
        this.apolloCmsService.fetchQuery(
            {
                query: getArticles,
                variables: {
                    skip,
                    ...(!!type && { filter: `data/typePlain/iv eq '${type}'` }),
                },
                context: {
                    headers: {
                        ...(!!page && { page }),
                    },
                },
            },
            false
        );
}
