import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import * as R from 'ramda';

import { CommodityType } from 'src/common/graphql/models/supply.model';
import { IOfferImportInput } from 'src/app/pages/suppliers/import/import.model';

@Pipe({
    name: 'offersByCommodityType',
})
export class OffersByCommodityTypePipe implements PipeTransform {
    transform(offerImportInput: IOfferImportInput[], commodityType: CommodityType): IOfferImportInput[] {
        return offerImportInput ?
            R.filter(
                ({ offer: { powerAttributes, gasAttributes } }) =>
                    commodityType === CommodityType.POWER ? powerAttributes : gasAttributes,
            )(offerImportInput) :
            [];
    }
}
