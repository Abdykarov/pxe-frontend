import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'inArray',
})
export class InArrayPipe implements PipeTransform {
    transform(item: any, array: any[]): boolean {
        return array.indexOf(item) >= 0;
    }
}
