import { Component } from '@angular/core';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import { tableCols, tableRows } from './config';

@Component({
    templateUrl: './page.html',
})
export class AdvancedTablesPageComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;
    public tableCols;
    public tableRows;

    constructor() {
        this.tableCols = tableCols;
        this.tableRows = tableRows;

        this.breadcrumbItemsSimple = [
            {
                label: 'Tables - advanced',
                url: null,
            },
        ];
    }

    private body = document.getElementById('top');

    public toggleOverlayer() {
        this.body.classList.toggle('body-inner--overlay');
        this.body.classList.toggle('body-inner--overlay-full');
    }
}
