import { Component } from '@angular/core';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';

@Component({
    templateUrl: './page.html',
})
export class AddPageComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;

    constructor() {
        this.breadcrumbItemsSimple = [
            {
                label: 'Add',
                url: null,
            },
        ];
    }

    public addAction = () => alert('ADDED');
}
