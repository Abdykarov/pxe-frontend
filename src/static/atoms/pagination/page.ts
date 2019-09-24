import { Component } from '@angular/core';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';

@Component({
  templateUrl: './page.html',
})

export class PaginationPageComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;
    public readonly totalItems = 108;
    public readonly itemsPerPage = 5;
    public readonly firstText = '&laquo;';
    public readonly previousText = '&lsaquo;';
    public readonly nextText = '&rsaquo;';
    public readonly lastText = '&raquo;';

    constructor() {
        this.breadcrumbItemsSimple = [
            {
                label: 'Pagination',
                url: null,
            },
        ];
    }
}
