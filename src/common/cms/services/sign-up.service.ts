import { Injectable } from '@angular/core';
import { ApolloCmsService } from 'src/app/services/apollo-cms.service';
import { signUpQuery } from 'src/common/cms/queries/sign-up';

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
