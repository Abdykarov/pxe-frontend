import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

import { ApolloCmsService } from 'src/app/services/apollo-cms.service';
import { cookiePolicyQuery } from 'src/common/cms/queries/cookie-policy';
import { normalizeCookie } from 'src/common/cms/utils/normalisation';

@Injectable({
    providedIn: 'root',
})
export class CookiePolicyService {

    constructor(
        private apolloCmsService: ApolloCmsService,
    ) {}

    public getCookiePolicy = () => this.apolloCmsService
        .fetchQuery({
            query: cookiePolicyQuery,
        })
        .pipe(map(normalizeCookie))

}
