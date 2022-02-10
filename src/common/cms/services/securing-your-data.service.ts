import { Injectable } from '@angular/core';
import { securingYourDataQuery } from 'src/common/cms/queries/securing-your-data';
import { ApolloCmsService } from 'src/common/services/apollo-cms.service';

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
