import { Injectable } from '@angular/core';
import { ApolloCmsService } from 'src/app/services/apollo-cms.service';
import { loginQuery } from 'src/common/cms/queries/login';

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
