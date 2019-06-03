import { Component } from '@angular/core';

@Component({
    templateUrl: './page.html',
})
export class ChangePasswordBannerPageComponent {
    public bannerImageSrc = '/assets/images/illustrations/accepted.svg';
    public bannerTitle = 'Vaše heslo bylo úspěšně změněno';

    public buttonLabel = 'Pokračovat';

    public clicked = (evt) => {
        evt.preventDefault();
    }
}
