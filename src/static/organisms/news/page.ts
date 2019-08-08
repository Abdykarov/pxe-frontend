import { Component } from '@angular/core';

import { config } from 'src/common/containers/news/news-container.config';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';

@Component({
    templateUrl: './page.html',
})
export class NewsPageComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;

    public newsConfig = config;

    constructor() {
        this.breadcrumbItemsSimple = [
            {
                label: 'News',
                url: null,
            },
        ];
    }
}
