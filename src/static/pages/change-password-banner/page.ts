import { Component } from '@angular/core';
import { BannerTypeImages } from 'src/common/ui/info-banner/models/info-banner.model';

@Component({
    templateUrl: './page.html',
})
export class ChangePasswordBannerPageComponent {
    public bannerType = BannerTypeImages;
    public bannerTitle = 'Vaše heslo bylo úspěšně změněno';

    public buttonLabel = 'Pokračovat';

    public clicked = (evt) => {
        evt.preventDefault();
    };
}
