import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import * as moment from 'moment';

@Pipe({
    name: 'isOfferValid',
})
export class IsOfferValid implements PipeTransform {

    transform(validTo: string): boolean {
        if (!validTo) {
            return true;
        }
        const to = moment(validTo);
        const now = moment();
        return to.diff(now) > 0;
    }
}
