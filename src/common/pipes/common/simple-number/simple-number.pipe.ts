import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'simpleNumber',
})
export class SimpleNumberPipe implements PipeTransform {
    transform(number: string): number {
        return parseInt(number, 10);
    }
}
