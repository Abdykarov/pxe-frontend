import { Component } from '@angular/core';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import { newsConfig } from 'src/static/config/news-config';

@Component({
    templateUrl: './page.html',
})
export class NewsPageComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;

    public newsConfig = newsConfig;

    constructor() {
        this.breadcrumbItemsSimple = [
            {
                label: 'News',
                url: null,
            },
        ];
    }
}
