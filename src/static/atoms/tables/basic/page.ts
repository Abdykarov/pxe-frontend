import { Component } from '@angular/core';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import * as config from './config';

@Component({
    templateUrl: './page.html',
})
export class BasicTablesPageComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;
    public tableCaption = 'Caption of table';
    public config: any;

    constructor() {
        this.config = config;

        this.breadcrumbItemsSimple = [
            {
                label: 'Tables - basic',
                url: null,
            },
        ];
    }
}
