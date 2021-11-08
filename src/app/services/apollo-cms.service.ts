import { Injectable } from '@angular/core';
import { QueryOptions } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import * as R from 'ramda';
import { map } from 'rxjs/operators';
import { CONSTS } from 'src/app/app.constants';
import { flatData, normalize } from 'src/common/cms/utils';
import { apolloGetOperationName } from 'src/common/utils';

@Injectable({
    providedIn: 'root',
})
export class ApolloCmsService {
    constructor(private apollo: Apollo) {}

    public watchQuery = (options: any): any =>
        this.apollo
            .use(CONSTS.APOLLO_CMS_KEY)
            .watchQuery(options)
            .valueChanges.pipe(
                map(({ data }) => data[apolloGetOperationName(options)]),
                map(normalize)
            );

    public fetchQuery = (
        options: QueryOptions<any>,
        withFlatData = true
    ): any =>
        this.apollo
            .use(CONSTS.APOLLO_CMS_KEY)
            .query(options)
            .pipe(
                map(({ data }) => data[apolloGetOperationName(options)]),
                map((operation) => {
                    if (withFlatData) {
                        return R.pipe(R.head, flatData)(operation);
                    }

                    return operation;
                }),
                map(normalize)
            );
}
