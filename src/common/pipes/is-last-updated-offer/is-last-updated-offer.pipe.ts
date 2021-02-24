import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import { CONSTS } from 'src/app/app.constants';
import { IOffer } from 'src/common/graphql/models/offer.model';

@Pipe({
    name: 'isLastUpdatedOffer',
})
export class IsLastUpdatedOfferPipe implements PipeTransform {

    transform(offer: IOffer): string {
        if (offer.isLastUpdated) {
            return CONSTS.IS_LAST_UPDATED_OFFER;
        }

        return '';
    }
}
