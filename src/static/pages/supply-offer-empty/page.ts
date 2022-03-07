import { Component } from '@angular/core';
import { IBreadcrumbItems } from 'src/common/ui/breadcrumb/models/breadcrumb.model';
import { BannerTypeImages } from 'src/common/ui/info-banner/models/info-banner.model';

@Component({
    templateUrl: './page.html',
})
export class SupplyOfferEmptyComponent {
    public bannerTypeImages = BannerTypeImages;
    public breadcrumbItemsSimple: IBreadcrumbItems;

    public bannerTitle = 'Nemáte žádnou nabídku elektřiny.';

    public bannerDescription =
        'Proveďte import nabídek nahráním CSV souboru nebo přidejte nabídku ručně.';

    public buttonLabel = 'Import nabídek';

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
    };
}
