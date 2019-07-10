import { Component } from '@angular/core';

import { IMAGE_TYPE } from 'src/app/app.constants';

@Component({
    templateUrl: './page.html',
})
export class ChangePasswordBannerPageComponent {
    public bannerImageType = IMAGE_TYPE.ACCEPTED;
    public bannerTitle = 'Vaše heslo bylo úspěšně změněno';

    public buttonLabel = 'Pokračovat';

    public clicked = (evt) => {
        evt.preventDefault();
    }
}
