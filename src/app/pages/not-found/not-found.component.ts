import { Component } from '@angular/core';

// own classes
import { AbstractComponent } from 'src/common/abstract.component';

// own modules
import { AuthService } from 'src/app/services/auth.service';
import {
    CommodityType,
    SubjectType,
} from 'src/common/graphql/models/supply.model';
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
    public commodityTypePower = CommodityType.POWER;
    public subjectTypeIndividual = SubjectType.SUBJECT_TYPE_INDIVIDUAL;

    public settings: ISettings = {
        isPublic: true,
        isPublicEmptyPage: true,
        isLandingPage: false,
        isSimpleFooter: false,
        loginType: LoginType.NONE,
        signUpType: SignType.NONE,
        isStatic: false,
        hideHamburger: true,
    };

    constructor(
        private authService: AuthService,
    ) {
        super();
    }

    public homeRedirect = (evt) => {
        evt.preventDefault();
        this.authService.homeRedirect();
    }
}
