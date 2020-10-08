import { Injectable } from '@angular/core';

import { ApolloCmsService } from 'src/app/services/apollo-cms.service';
import { getLandingPageQuery } from 'src/common/cms/queries/landing-page';

@Injectable({
    providedIn: 'root',
})
export class LandingPageService  {

    constructor(
        private apolloCmsService: ApolloCmsService,
    ) {}

    public getLandingPage = () => this.apolloCmsService
        .fetchQuery({
            query: getLandingPageQuery,
        })
}
