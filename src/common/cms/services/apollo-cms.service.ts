import { Injectable } from '@angular/core';

import * as R from 'ramda';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { WatchQueryOptions } from 'apollo-angular/types';

import { CONSTS } from 'src/app/app.constants';

const getOperationName = R.pipe(
    R.path(['query', 'definitions']),
    R.head,
    R.path(['name', 'value']),
);

const getFirstData = R.pathOr({}, [0, 'data']);

const mapIvToValue = R.map(R.prop('iv'));

const mapResponseToData = R.pipe(
    getFirstData,
    mapIvToValue,
);


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
                map(({data}) =>  data[getOperationName(options)]),
                map(mapResponseToData),
            )
}
