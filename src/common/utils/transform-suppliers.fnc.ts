import * as R from 'ramda';

import { ISupplier } from '../ui/supplier/model/supplier.model';

export const transformSuppliers = (suppliers: ISupplier[]) => {
    return R.map(supplier => {
        return {
            ...supplier,
            key: supplier.id,
            value: supplier.id,
            label: supplier.name,
        };
    }, suppliers);
};
