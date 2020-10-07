import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

import { ApolloCmsService } from 'src/app/services/apollo-cms.service';
import { normalizeSignUp } from 'src/common/cms/utils/normalisation';
import { signUpQuery } from 'src/common/cms/queries/sign-up';

@Injectable({
    providedIn: 'root',
})
export class SignUpService {

    constructor(
        private apolloCmsService: ApolloCmsService,
    ) {}

    public getSignUp = () => this.apolloCmsService
        .fetchQuery({
            query: signUpQuery,
        })
        .pipe(map(normalizeSignUp))
}
