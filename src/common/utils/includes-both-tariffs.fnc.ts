import * as R from 'ramda';
import { CODE_LIST } from 'src/app/app.constants';
import { ICodelistOptions } from 'src/common/graphql/models/supply.model';

export const includesBothTariffs = (
    id: string,
    codelists: ICodelistOptions
): boolean =>
    codelists &&
    !!R.find(R.propEq('value', id))(
        codelists[CODE_LIST.DISTRIBUTION_RATE_BOTH]
    );
