import { Component } from '@angular/core';

import { BannerTypeImages } from 'src/common/ui/info-banner/models/info-banner.model';

@Component({
    templateUrl: './page.html',
})

export class Error503PageComponent {
    public bannerType = BannerTypeImages;
    public bannerTitle = 'Omlouváme se, aplikace PARC4U je dočasně mimo provoz';
    public bannerDescription = 'Aplikaci PARC4U pro vás právě vylepšujeme, proto se vám do ní nedaří přihlásit. Zkuste to prosím znovu později.';

    public buttonLabel = 'Navštívit stránky pxe.cz';

    public clicked = (evt) => {
        evt.preventDefault();
    }
}
