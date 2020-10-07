import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

import { ApolloCmsService } from 'src/app/services/apollo-cms.service';
import { normalizeLogin } from 'src/common/cms/utils/normalisation';
import { loginQuery } from 'src/common/cms/queries/login';

@Injectable({
    providedIn: 'root',
})
export class LoginService {

    constructor(
        private apolloCmsService: ApolloCmsService,
    ) {}

    public getLogin = () => this.apolloCmsService
        .fetchQuery({
            query: loginQuery,
        })
        .pipe(map(normalizeLogin))
}
