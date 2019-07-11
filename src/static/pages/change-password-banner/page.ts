import { Component } from '@angular/core';

import { BannerType } from 'src/static/organisms/info-banner/info-banner.model';

@Component({
    templateUrl: './page.html',
})
export class ChangePasswordBannerPageComponent {
    public bannerType = BannerType.ACCEPTED;
    public bannerTitle = 'Vaše heslo bylo úspěšně změněno';

    public buttonLabel = 'Pokračovat';

    public clicked = (evt) => {
        evt.preventDefault();
    }
}
