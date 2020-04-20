import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import { isLogged } from 'src/common/utils/is-logged.fnc';

@Pipe({
    name: 'isLogged',
})
export class IsLoggedPipe implements PipeTransform {

    transform(currentUserValue: any): boolean {
        return isLogged(currentUserValue);
    }
}
