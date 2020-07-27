import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import { appendStringToSpecPositions } from 'src/common/utils';

@Pipe({
    name: 'phone',
})
export class PhonePipe implements PipeTransform {

    transform(phoneNumber: string): string {
        phoneNumber = phoneNumber.trim();

        switch (phoneNumber.length) {
            case 9:
                return appendStringToSpecPositions(phoneNumber, [3, 6], ' ');
            case 13:
                return appendStringToSpecPositions(phoneNumber, [4, 7, 10], ' ');
            default:
                return phoneNumber;
        }
    }
}
