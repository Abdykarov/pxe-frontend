import { Component } from '@angular/core';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';

@Component({
    templateUrl: './page.html',
})
export class TabsPageComponent {
    private body = document.getElementById('top');
    public breadcrumbItemsSimple: IBreadcrumbItems;

    public toggleOverlayer() {
        this.body.classList.toggle('body-inner--overlay');
        this.body.classList.toggle('body-inner--overlay-full');
    }

    constructor() {
        this.breadcrumbItemsSimple = [
            {
                label: 'Tabs',
                url: null,
            },
        ];
    }
}
