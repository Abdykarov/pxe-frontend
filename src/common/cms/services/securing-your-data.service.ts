import { Injectable } from '@angular/core';
import { ApolloCmsService } from 'src/app/services/apollo-cms.service';
import { securingYourDataQuery } from 'src/common/cms/queries/securing-your-data';

@Injectable({
    providedIn: 'root',
})
export class SecuringYourDataService {
    constructor(private apolloCmsService: ApolloCmsService) {}

    public getSecuringYourData = () =>
        this.apolloCmsService.fetchQuery({
            query: securingYourDataQuery,
        });
}
