import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { BlogService } from 'src/app/pages/public/blog/blog.service';
import { ApolloCmsService } from 'src/app/services/apollo-cms.service';
import { getLandingPageQuery } from 'src/common/cms/queries/landing-page';
import { normalizeLandingPageQuery } from 'src/common/cms/utils/normalisation';

@Injectable({
    providedIn: 'root',
})
export class LandingPageService {
    constructor(
        private apolloCmsService: ApolloCmsService,
        private blogService: BlogService
    ) {}

    public getLandingPage = () =>
        this.apolloCmsService
            .fetchQuery(
                {
                    query: getLandingPageQuery,
                },
                false,
                true
            )
            .pipe(map(normalizeLandingPageQuery(this.blogService)));
}
