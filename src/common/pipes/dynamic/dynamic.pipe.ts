import { DecimalPipe } from '@angular/common';
import {
    Injector,
    Pipe,
    PipeTransform,
    Type,
} from '@angular/core';

import * as R from 'ramda';

@Pipe({
    name: 'dynamic',
})
export class DynamicPipe implements PipeTransform {

    private pipesMapping = {
        'number': DecimalPipe,
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
            if (pipeName === 'number') {
                value = value.toString().replace(',', '.');
            }
            const pipe = this.injector.get(pipeToken as Type<any>);
            return pipe.transform(value, ...pipeArgs);
        }
    }
}
