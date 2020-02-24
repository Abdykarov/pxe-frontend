import { Component } from '@angular/core';

import { BannerTypeImages } from 'src/common/ui/info-banner/models/info-banner.model';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';

@Component({
    templateUrl: './page.html',
})
export class SupplyOfferEmptyComponent {
    public bannerTypeImages = BannerTypeImages;
    public breadcrumbItemsSimple: IBreadcrumbItems;

    bannerTitle = 'Nemáte žádnou nabídku elektřiny.';

    bannerDescription = 'Proveďte import nabídek nahráním CSV souboru, nebo přidejte nabídku ručně.';

    buttonLabel = 'Import nabídek';

    constructor() {
        this.breadcrumbItemsSimple = [
            {
                label: 'Supply offer',
                url: null,
            },
        ];
    }

    public clicked = (evt) => {
        evt.preventDefault();
        console.log('clicked');
    }
}
