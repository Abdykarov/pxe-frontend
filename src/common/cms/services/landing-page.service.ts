import { Injectable } from '@angular/core';


import { ApolloCmsService } from '../../../app/services/apollo-cms.service';
import { getLandingPageQuery } from '../queries/landing-page';

@Injectable({
    providedIn: 'root',
})
export class LandingPageService  {

    constructor(
        private apolloCmsService: ApolloCmsService,
    ) {}

    public getHowItWords = () => this.apolloCmsService
        .watchQuery({
            query: getLandingPageQuery,
        })

}
