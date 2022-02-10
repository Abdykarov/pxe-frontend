import { Injectable } from '@angular/core';
import { cookiePolicyQuery } from 'src/common/cms/queries/cookie-policy';
import { ApolloCmsService } from 'src/common/services/apollo-cms.service';

@Injectable({
    providedIn: 'root',
})
export class CookiePolicyService {
    constructor(private apolloCmsService: ApolloCmsService) {}

    public getCookiePolicy = () =>
        this.apolloCmsService.fetchQuery({
            query: cookiePolicyQuery,
        });
}
