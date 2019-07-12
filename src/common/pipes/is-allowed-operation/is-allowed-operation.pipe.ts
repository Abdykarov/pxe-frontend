import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import * as R from 'ramda';
import * as R_ from 'ramda-extension';

import { AllowedOperations, ISupplyPoint } from 'src/common/graphql/models/supply.model';

@Pipe({
    name: 'isAllowedOperation',
})
export class IsAllowedOperationPipe implements PipeTransform {
    transform(supplyPoint: ISupplyPoint, allowedOperation: AllowedOperations): boolean {
        if (R.isNil(supplyPoint)) {
            return false;
        }
        const allowedOperations: AllowedOperations[] = supplyPoint.allowedOperations;
        return R_.isArray(allowedOperations) && allowedOperations.indexOf(allowedOperation) >= 0;
    }
}
