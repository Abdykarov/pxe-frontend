import { Injectable } from '@angular/core';

import * as R from 'ramda';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { QueryOptions } from 'apollo-client';
import { WatchQueryOptions } from 'apollo-angular/types';

import { apolloGetOperationName } from 'src/common/utils';
import { CONSTS } from 'src/app/app.constants';
import {
    flatData,
    normalize,
} from 'src/common/cms/utils';

@Injectable({
    providedIn: 'root',
})
export class ApolloCmsService {

    constructor(
        private apollo: Apollo,
    ) {}

    public watchQuery = (options: WatchQueryOptions<any>): any =>
        this.apollo.use(CONSTS.APOLLO_CMS_KEY)
            .watchQuery(options)
            .valueChanges
            .pipe(
                map(({data}) =>  data[apolloGetOperationName(options)]),
                map(normalize),
            )

    public fetchQuery = (options: QueryOptions<any>): any =>
        this.apollo.use(CONSTS.APOLLO_CMS_KEY)
            .query(options)
            .pipe(
                map(({data}) =>  data[apolloGetOperationName(options)]),
                map(R.pipe(R.head, flatData)),
                map(normalize),
            )

}
