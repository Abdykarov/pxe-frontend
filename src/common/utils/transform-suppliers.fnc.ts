import * as R from 'ramda';
import { ISupplierLogo } from 'src/common/ui/supplier/model/supplier.model';

export const transformSuppliers = (suppliers: ISupplierLogo[]) => {
    return R.map((supplier) => {
        return {
            ...supplier,
            key: supplier.id,
            value: supplier.id,
            label: supplier.name,
        };
    }, suppliers);
};
