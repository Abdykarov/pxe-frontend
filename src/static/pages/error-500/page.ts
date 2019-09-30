import { Component } from '@angular/core';

import { BannerTypeImages } from 'src/common/ui/info-banner/models/info-banner.model';

@Component({
    templateUrl: './page.html',
})

export class Error500PageComponent {
    public bannerType = BannerTypeImages;
    public bannerTitle = 'Objevila se neočekávaná chyba';
}
