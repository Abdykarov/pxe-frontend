import { Component } from '@angular/core';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import {
    tableCols,
    tableRows,
} from './config';

@Component({
  templateUrl: './page.html',
})

export class BreadcrumbPageComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;
    public breadcrumbItemsMultiple: IBreadcrumbItems;
    public breadcrumbItemsWithDropdown: IBreadcrumbItems;
    public tableCols: any;
    public tableRows: any;
    private body = document.getElementById('top');

    public toggleOverlayer() {
        this.body.classList.toggle('body-inner--overlay');
        this.body.classList.toggle('body-inner--overlay-full');
    }

    constructor(
    ) {
        this.breadcrumbItemsSimple = [
            {
                label: 'Breadcrumbs',
                url: null,
            },
        ];

        this.breadcrumbItemsMultiple = [
            {
                label: 'Buttons',
                url: '/buttons',
            },
            {
                label: 'Modals',
                url: '/modals',
            },
            {
                label: 'Colors',
                url: '/colors',
            },
            {
                label: 'Last item',
                url: '',
            },
        ];

        this.breadcrumbItemsWithDropdown = [
            {
                label: 'Buttons',
                url: '/buttons',
            },
            {
                label: 'Modals',
                url: '/modals',
            },
            {
                label: 'Dropdown item',
                hasTemplate: true,
                overlayEnabled: true,
                dropdownAction: () => {
                    this.toggleOverlayer();
                },
            },
        ];

        this.tableCols = tableCols;
        this.tableRows = tableRows;
    }
}
