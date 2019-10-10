import { Component } from '@angular/core';
import { Router } from '@angular/router';

// own classes
import { AbstractComponent } from 'src/common/abstract.component';

// own modules
import { AuthService } from 'src/app/services/auth.service';
import {
    ISettings,
    LoginType,
    SignType,
} from 'src/app/layouts/models/router-data.model';

@Component({
    templateUrl: './not-found.component.html',
    styleUrls: ['../../../assets/scss/05_pages/error-page.scss'],
})
export class NotFoundComponent extends AbstractComponent {
    public settings: ISettings = {
        isPublic: true,
        isPublicEmptyPage: true,
        isLandingPage: false,
        isSimpleFooter: true,
        loginType: LoginType.NONE,
        signUpType: SignType.NONE,
        isStatic: false,
        hideHamburger: true,
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
