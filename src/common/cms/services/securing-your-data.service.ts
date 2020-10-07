import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

import { ApolloCmsService } from 'src/app/services/apollo-cms.service';
import { normalizeSecuringYourData } from 'src/common/cms/utils/normalisation';
import { securingYourDataQuery } from 'src/common/cms/queries/securing-your-data';

@Injectable({
    providedIn: 'root',
})
export class SecuringYourDataService {

    constructor(
        private apolloCmsService: ApolloCmsService,
    ) {}

    public getSecuringYourData = () => this.apolloCmsService
        .fetchQuery({
            query: securingYourDataQuery,
        })
        .pipe(map(normalizeSecuringYourData))

}
