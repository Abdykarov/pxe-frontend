import { Component } from '@angular/core';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';

@Component({
    templateUrl: './page.html',
})
export class PaginationPageComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;
    public readonly totalItems = 108;
    public readonly itemsPerPage = 5;
    public readonly firstText = '<span class="arrow-text">first</span>';
    public readonly previousText = '<span class="arrow-text">prev</span>';
    public readonly nextText = '<span class="arrow-text">next</span>';
    public readonly lastText = '<span class="arrow-text">last</span>';

    constructor() {
        this.breadcrumbItemsSimple = [
            {
                label: 'Pagination',
                url: null,
            },
        ];
    }
}
