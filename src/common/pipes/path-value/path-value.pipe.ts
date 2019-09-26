import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import * as R from 'ramda';

@Pipe({
    name: 'pathValue',
})
export class PathValuePipe implements PipeTransform {
    transform(obj: object, path: string[]): any {
        return R.path(path, obj);
    }
}
