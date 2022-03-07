import { Injectable } from '@angular/core';
import { ApolloCmsService } from 'src/app/services/apollo-cms.service';
import { cookiePolicyQuery } from 'src/common/cms/queries/cookie-policy';

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
