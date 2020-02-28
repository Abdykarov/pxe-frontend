import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import * as R from 'ramda';

import { CommodityType } from 'src/common/graphql/models/supply.model';
import { IOfferImportInput } from 'src/app/pages/import/import.model';

@Pipe({
    name: 'offersByCommodityType',
})
export class OffersByCommodityTypePipe implements PipeTransform {
    transform(offerImportInput: IOfferImportInput[], commodityType: CommodityType): IOfferImportInput[] {
        if (!offerImportInput) {
            return [];
        }
        return R.filter(({offerInput}) => {
            if (commodityType === CommodityType.POWER) {
                return offerInput.powerAttributes;
            }
            return offerInput.gasAttributes;
        })(offerImportInput);
    }
}
