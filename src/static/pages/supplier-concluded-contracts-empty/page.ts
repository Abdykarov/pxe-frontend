import { Component } from '@angular/core';
import { BannerTypeImages } from 'src/common/ui/info-banner/models/info-banner.model';

@Component({
    templateUrl: './page.html',
})
export class SupplierConcludedContractsEmptyComponent {
    public bannerType = BannerTypeImages.SUPPLIER_NULL;

    public redirectToOffer = (evt) => {
        evt.preventDefault();
        console.log('CLICKED');
    };
}
