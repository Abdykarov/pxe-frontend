import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

import { ApolloCmsService } from 'src/app/services/apollo-cms.service';
import { normalizeTermsOfUseData } from 'src/common/cms/utils/normalisation';
import { termsOfUseQuery } from '../queries/terms-of-use';

@Injectable({
    providedIn: 'root',
})
export class TermsOfUseService {

    constructor(
        private apolloCmsService: ApolloCmsService,
    ) {}

    public getTermsOfUse = () => this.apolloCmsService
        .fetchQuery({
            query: termsOfUseQuery,
        })
        .pipe(map(normalizeTermsOfUseData))
}
