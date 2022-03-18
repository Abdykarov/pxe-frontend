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
            data: '1',
            label: 'Byt - Praha',
        },
        {
            data: '2',
            description: '859182465878565209',
            label: '987328424',
        },
        {
            data: '3',
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
