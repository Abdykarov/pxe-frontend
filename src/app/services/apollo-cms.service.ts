import { Injectable } from '@angular/core';
import { QueryOptions } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { CONSTS } from 'src/app/app.constants';
import { normalize, removeFlatData } from 'src/common/cms/utils';
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
        withFlatData = true,
        isMultipleOperations = false
    ): any => {
        return this.apollo
            .use(CONSTS.APOLLO_CMS_KEY)
            .query(options)
            .pipe(
                map(({ data }) => {
                    if (!isMultipleOperations) {
                        const operation = data[apolloGetOperationName(options)];
                        if (withFlatData) {
                            return removeFlatData(operation);
                        }

                        return operation;
                    }
                    return data;
                }),
                map(normalize)
            );
    };
}
