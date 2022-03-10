import { Pipe, PipeTransform } from '@angular/core';
import * as R from 'ramda';
import { INavigationItem } from 'src/common/ui/navigation/models/navigation.model';

@Pipe({
    name: 'isMenuItemActive',
})
export class IsMenuItemActivePipe implements PipeTransform {
    transform(menuConfig: INavigationItem, actualUrl: string): boolean {
        const mainUrl = menuConfig.url;
        const childrenUrls = R.pipe(
            R.map(R.props(['url'])),
            R.values,
            R.flatten
        )(menuConfig.children || []);
        const allUrls = R.concat([mainUrl], childrenUrls);
        const matchUrls = R.filter((url) => {
            return R.indexOf(url, actualUrl) >= 0;
        })(allUrls);
        return matchUrls.length > 0;
    }
}
