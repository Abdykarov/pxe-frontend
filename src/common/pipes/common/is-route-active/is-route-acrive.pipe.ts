import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'isRouteActive',
})
export class IsRouteActivePipe implements PipeTransform {
    transform(value: string, activeRoute: string): boolean {
        return value === activeRoute;
    }
}
