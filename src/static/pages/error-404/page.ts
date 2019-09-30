import { Component } from '@angular/core';

import { BannerTypeImages } from 'src/common/ui/info-banner/models/info-banner.model';

@Component({
    templateUrl: './page.html',
})

export class Error404PageComponent {
    public bannerType = BannerTypeImages;
    public bannerTitle = 'Je nám líto, ale tato stránka neexistuje';
    public bannerDescription = 'Pravděpodobně byla odstraněna, nebo jste zadali špatnou URL adresu.';

    public buttonLabel = 'Zobrazit úvodní stránku';

    public clicked = (evt) => {
        evt.preventDefault();
    }
}
