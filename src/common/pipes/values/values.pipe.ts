import {
    Pipe,
    PipeTransform,
} from '@angular/core';

@Pipe({
  name: 'values',
})
export class ValuesPipe implements PipeTransform {
    transform(value: any): any[] {
        if (!value) {
            return [];
        }
        return Object.values(value);
    }
}


