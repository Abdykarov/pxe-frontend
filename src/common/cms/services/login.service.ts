import { Injectable } from '@angular/core';
import { loginQuery } from 'src/common/cms/queries/login';
import { ApolloCmsService } from 'src/common/services/apollo-cms.service';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    constructor(private apolloCmsService: ApolloCmsService) {}

    public getLogin = () =>
        this.apolloCmsService.fetchQuery({
            query: loginQuery,
        });
}
