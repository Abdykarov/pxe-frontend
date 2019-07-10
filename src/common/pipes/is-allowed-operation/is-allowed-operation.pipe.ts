import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import * as R_ from 'ramda-extension';

import { AllowedOperations } from 'src/common/graphql/models/supply.model';

@Pipe({
    name: 'isAllowedOperation',
})
export class IsAllowedOperationPipe implements PipeTransform {
    transform(allowedOperations: AllowedOperations[], allowedOperation: AllowedOperations): boolean {
        return R_.isArray(allowedOperations) && allowedOperations.indexOf(allowedOperation) >= 0;
    }
}
