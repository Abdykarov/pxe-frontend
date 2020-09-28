import { Injectable } from '@angular/core';

import * as R from 'ramda';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { WatchQueryOptions } from 'apollo-angular/types';

import { CONSTS } from 'src/app/app.constants';

@Injectable({
    providedIn: 'root',
})
export class ApolloCmsService {

    private getOperationName = R.pipe(
        R.path(['query', 'definitions']),
        R.head,
        R.path(['name', 'value']),
    );

    private getFirstData = R.pathOr({}, [0, 'data']);

    private mapIvToValue = R.map(R.prop('iv'));

    private mapResponseToData = R.pipe(
        this.getFirstData,
        this.mapIvToValue,
    );

    constructor(
        private apollo: Apollo,
    ) {}

    public watchQuery = (options: WatchQueryOptions<any>): any =>
        this.apollo.use(CONSTS.APOLLO_CMS_KEY)
            .watchQuery(options)
            .valueChanges
            .pipe(
                map(({data}) =>  data[this.getOperationName(options)]),
                map(this.mapResponseToData),
            )
}
