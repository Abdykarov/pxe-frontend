import { Pipe, PipeTransform } from '@angular/core';
import * as R from 'ramda';
import * as R_ from 'ramda-extension';
import { AllowedOperations } from 'src/common/graphql/models/supply.model';

@Pipe({
    name: 'isAllowedOperation',
})
export class IsAllowedOperationPipe implements PipeTransform {
    transform(
        allowedOperations: AllowedOperations[],
        allowedOperation: AllowedOperations
    ): boolean {
        if (R.isNil(allowedOperations)) {
            return false;
        }

        return (
            R_.isArray(allowedOperations) &&
            allowedOperations.indexOf(allowedOperation) >= 0
        );
    }
}
