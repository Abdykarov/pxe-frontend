import { Injectable } from '@angular/core';

import { ApolloCmsService } from 'src/app/services/apollo-cms.service';
import { getLandingPageQuery } from 'src/common/cms/queries/landing-page';
import { map } from 'rxjs/operators';
import { normalizeLandingPage } from 'src/common/cms/utils/normalisation';

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
        .pipe(map(normalizeLandingPage))

}
