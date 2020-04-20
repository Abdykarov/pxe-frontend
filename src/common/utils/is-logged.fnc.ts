import { inArray } from 'src/common/utils/in-array';
import { IUserRoles } from 'src/app/services/model/auth.model';

export const isLogged = (currentUserValue: any): boolean =>  currentUserValue && currentUserValue.role &&
    !inArray(currentUserValue.role[0], [
        IUserRoles.NEEDS_SMS_CONFIRMATION,
        IUserRoles.RESET_PASSWORD,
    ]);
