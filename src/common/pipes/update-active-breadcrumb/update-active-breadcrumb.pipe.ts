import {
    Pipe,
    PipeTransform,
} from '@angular/core';

import * as R from 'ramda';

import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import { IType } from 'src/common/cms/models/blog';

@Pipe({
    name: 'updateActiveBreadcrumb',
})
export class UpdateActiveBreadcrumbPipe implements PipeTransform {

    transform(breadcrumbItems: IBreadcrumbItems, types: IType[], url: string): IBreadcrumbItems {
        const type = R.find(
            R.propEq('url', url),
        )(types);

        const newBreadcrumbItems = breadcrumbItems;
        newBreadcrumbItems[1].label = type?.label ?? 'Vše';
        return newBreadcrumbItems;
    }
}
