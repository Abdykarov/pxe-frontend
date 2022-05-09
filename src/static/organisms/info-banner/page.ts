import { Component } from '@angular/core';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';

@Component({
    templateUrl: './page.html',
})
export class InfoBannerPageComponent {
    public breadcrumbItemsSimple: IBreadcrumbItems;

    constructor() {
        this.breadcrumbItemsSimple = [
            {
                label: 'Info banner',
                url: null,
            },
        ];
    }

    public bannerDescription =
        'Info banner message description banner message description';

    public buttonLabel = 'Info banner CTA';

    public bannerTitle = 'Info banner message title banner message title';

    public clicked = (evt) => {
        evt.preventDefault();
        console.log('clicked');
    };
}
