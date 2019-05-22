import { Component } from '@angular/core';

import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import {
    tableCols,
    tableRows,
} from './config';

@Component({
    templateUrl: './page.html',
})

export class SupplyOfferComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;
    public tableCols = tableCols;
    public tableRows = tableRows;

    constructor() {
        this.breadcrumbItemsSimple = [
            {
                label: 'Supply offer',
                url: null,
            },
        ];
    }

    public edit = (table, row) => {
        console.log('%c ***** edit *****', 'background: #bada55; color: #000; font-weight: bold', row);
        if (table.openedRow !== row) {
            table.openRow(row);
            table.selectRow(row);
        }
    }

    public create = (table, row) => {
        console.log('%c ***** edit *****', 'background: #bada55; color: #000; font-weight: bold', row, table.rowOpened);
        if (table.openedRow !== row) {
            table.openRow(row);
            table.selectRow(row);
        }
    }

    public rowOpened = (row) => {
        console.log('%c ***** rowOpened *****', 'background: #bada55; color: #000; font-weight: bold', row);
    }

    public rowSelected = (row) => {
        console.log('%c ***** rowSelected *****', 'background: #bada55; color: #000; font-weight: bold', row);
    }
}
