import { Injectable } from '@angular/core';
import { ApolloCmsService } from 'src/app/services/apollo-cms.service';
import { termsOfUseQuery } from '../queries/terms-of-use';

@Injectable({
    providedIn: 'root',
})
export class TermsOfUseService {
    constructor(private apolloCmsService: ApolloCmsService) {}

    public getTermsOfUse = () =>
        this.apolloCmsService.fetchQuery({
            query: termsOfUseQuery,
        });
}
