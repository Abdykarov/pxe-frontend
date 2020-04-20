import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import { inArray } from 'src/common/utils';
import { IUserRoles } from 'src/app/services/model/auth.model';

@Pipe({
    name: 'isLogged',
})
export class IsLoggedPipe implements PipeTransform {
    transform(currentUserValue: any): boolean {
        return  currentUserValue && currentUserValue.role &&
            !inArray(currentUserValue.role[0], [
                IUserRoles.NEEDS_SMS_CONFIRMATION,
                IUserRoles.RESET_PASSWORD,
            ]);
    }
}
