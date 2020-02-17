import {
    FormGroup,
} from '@angular/forms';
import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import * as R from 'ramda';

@Pipe({
  name: 'valueOfForm',
})
export class ValueOfFormPipe implements PipeTransform {
    transform(form: FormGroup, path: string | string[]): string {
        if (!form || !path) {
            return null;
        }

        if (typeof path === 'string') {
            return form.get(path).value;
        }

        return R.reduce((res, onePath) => res + form.get(onePath).value, '', path);
    }
}
