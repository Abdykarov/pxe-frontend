import { Injectable } from '@angular/core';
import { signUpQuery } from 'src/common/cms/queries/sign-up';
import { ApolloCmsService } from 'src/common/services/apollo-cms.service';

@Injectable({
    providedIn: 'root',
})
export class SignUpService {
    constructor(private apolloCmsService: ApolloCmsService) {}

    public getSignUp = () =>
        this.apolloCmsService.fetchQuery({
            query: signUpQuery,
        });
}
