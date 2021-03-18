import { Component } from '@angular/core';

import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import { IMicroTableData } from 'src/common/ui/micro-table/micro-table/item.model';

@Component({
  templateUrl: './page.html',
})
export class MicroTablePageComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;
    public rows: IMicroTableData[] = [
        {
            id: '1',
            label: 'Byt - Praha',
        },
        {
            id: '2',
            label: '987328424',
        },
        {
            id: '3',
            label: 'Byt - Brno',
        },
    ];

    constructor() {
        this.breadcrumbItemsSimple = [
            {
                label: 'Micro table',
                url: null,
            },
        ];
    }

    public action = (id) => console.log(id);
}
