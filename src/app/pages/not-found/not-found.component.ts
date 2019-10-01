import { Component } from '@angular/core';
import { Router } from '@angular/router';

// own classes
import { AbstractComponent } from 'src/common/abstract.component';

// own modules
import { BannerTypeImages } from 'src/common/ui/info-banner/models/info-banner.model';
import { ROUTES } from 'src/app/app.constants';

@Component({
    templateUrl: './not-found.component.html',
})
export class NotFoundComponent extends AbstractComponent {
    public bannerType = BannerTypeImages;
    public bannerTitle = 'Je nám líto, ale tato stránka neexistuje';
    public bannerDescription = 'Pravděpodobně byla odstraněna, nebo jste zadali špatnou URL adresu.';
    public buttonLabel = 'Zobrazit úvodní stránku';

    constructor(
        private router: Router,
    ) {
        super();
    }

    public redirectToDashboard = (evt) => {
        this.router.navigate([ROUTES.ROUTER_DASHBOARD]);
    }
}
