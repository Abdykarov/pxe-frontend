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

    public getArticles = (
        skip = 0,
        type: string = undefined,
        page: string = null,
        url: string = undefined,
        top: number = undefined
    ) => {
        return this.apolloCmsService.fetchQuery(
            {
                query: getArticles,
                variables: {
                    skip,
                    ...(!!type && { filter: `data/typePlain/iv eq '${type}'` }),
                    ...(!!url && { filter: `data/url/iv eq '${url}'` }),
                    ...(!!type &&
                        !!url && {
                            filter: `data/url/iv eq '${url}' or data/typePlain/iv eq '${type}'`,
                        }),
                    top,
                },
                context: {
                    headers: {
                        ...(!!page && { page }),
                    },
                },
            },
            false
        );
    };
}
