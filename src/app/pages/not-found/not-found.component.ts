import { Component } from '@angular/core';
import { Router } from '@angular/router';

// own classes
import { AbstractComponent } from 'src/common/abstract.component';

// own modules
import { AuthService } from 'src/app/services/auth.service';
import { BannerTypeImages } from 'src/common/ui/info-banner/models/info-banner.model';
import {
    ISettings,
    LoginType,
    SignType,
} from 'src/app/layouts/models/router-data.model';

@Component({
    templateUrl: './not-found.component.html',
})
export class NotFoundComponent extends AbstractComponent {
    public bannerType = BannerTypeImages;
    public bannerTitle = 'Je nám líto, ale tato stránka neexistuje';
    public bannerDescription = 'Pravděpodobně byla odstraněna, nebo jste zadali špatnou URL adresu.';
    public buttonLabel = 'Zobrazit úvodní stránku';

    public settings: ISettings = {
        isPublic: true,
        isPublicEmptyPage: true,
        isLandingPage: false,
        isSimpleFooter: true,
        loginType: LoginType.NONE,
        signUpType: SignType.NONE,
        isStatic: false,
    };

    constructor(
        private authService: AuthService,
        private router: Router,
    ) {
        super();
    }

    public homeRedirect = () => {
        this.authService.homeRedirect();
    }
}
