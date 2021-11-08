import { Pipe, PipeTransform } from '@angular/core';
import * as R_ from 'ramda-extension';
import { IJwtPayload, IUserRoles } from 'src/app/services/model/auth.model';

@Pipe({
    name: 'isLogged',
})
export class IsLoggedPipe implements PipeTransform {
    transform(currentUserValue: IJwtPayload): boolean {
        return (
            currentUserValue &&
            currentUserValue.role &&
            !R_.containsAny(currentUserValue.role, [
                IUserRoles.NEEDS_SMS_CONFIRMATION,
                IUserRoles.RESET_PASSWORD,
            ])
        );
    }
}
