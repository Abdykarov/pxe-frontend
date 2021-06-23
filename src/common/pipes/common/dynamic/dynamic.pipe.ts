import { DecimalPipe } from '@angular/common';
import {
    Injector,
    Pipe,
    PipeTransform,
    Type,
} from '@angular/core';

import * as R from 'ramda';

import { CeilPipe } from 'src/common/pipes/common/ceil-number/simple-number.pipe';
import { IsLastUpdatedOfferPipe } from 'src/common/pipes/common/is-last-updated-offer/is-last-updated-offer.pipe';

@Pipe({
    name: 'dynamic',
})
export class DynamicPipe implements PipeTransform {

    private pipesMapping = {
        'number': DecimalPipe,
        'ceil': CeilPipe,
        'isLastUpdatedOffer': IsLastUpdatedOfferPipe,
    };

    public constructor(
        private injector: Injector,
    ) {}

    transform(value: any, pipeWithArgs: string): any {
        if (R.isNil(pipeWithArgs)) {
            return value;
        }
        let pipeName, pipeArgs;
        [pipeName, ...pipeArgs] = pipeWithArgs.split(':');
        const pipeToken = this.pipesMapping[pipeName];
        if (!pipeName || R.isNil(pipeToken)) {
            return value;
        } else {
            if (R.indexOf(pipeName, ['number', 'ceil']) >= 0) {
                value = value.toString().replace(',', '.');
            }
            const pipe = this.injector.get(pipeToken as Type<any>);
            return pipe.transform(value, ...pipeArgs);
        }
    }
}
