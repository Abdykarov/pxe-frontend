import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

import { ApolloCmsService } from 'src/app/services/apollo-cms.service';
import { cookiePolicyQuery } from '../queries/cookie-policy';
import { getFlatData } from 'src/common/cms/utils/normalisation';

@Injectable({
    providedIn: 'root',
})
export class CookiePolicyService {

    constructor(
        private apolloCmsService: ApolloCmsService,
    ) {}

    public getNews = () => this.apolloCmsService
        .watchQuery({
            query: cookiePolicyQuery,
        })
        .pipe(map(getFlatData))

}
