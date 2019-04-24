import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import * as R from 'ramda';

import {
    ISupplier,
    TypeCommodity,
} from 'src/common/ui/supplier/model/supplier.model';

@Pipe({
    name: 'filter_commodity',
    pure: false,
})
export class FilterCommodityTypePipe implements PipeTransform {
    transform(value: ISupplier[], arg: TypeCommodity): ISupplier[] {
        switch (arg) {
            case TypeCommodity.BOTH:
                return value;
            case TypeCommodity.GAS:
                return value.filter(supplier => R.contains(supplier.typeCommodity , [TypeCommodity.BOTH, TypeCommodity.GAS]));
            case TypeCommodity.POWER:
                return value.filter(supplier => R.contains(supplier.typeCommodity , [TypeCommodity.BOTH, TypeCommodity.POWER]));
        }
    }
}


