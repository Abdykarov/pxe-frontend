import { Component } from '@angular/core';
import {
    CommodityTypesLowerCase,
    SubjectTypeLowerCase,
} from 'src/app/app.constants';
import {
    ISettings,
    LoginType,
    SignType,
} from 'src/app/layouts/models/router-data.model';
import { AbstractComponent } from 'src/common/abstract.component';
import { AuthService } from 'src/common/services/auth.service';

@Component({
    templateUrl: './not-found.component.html',
    styleUrls: ['../../../assets/scss/05_pages/error-page.scss'],
})
export class NotFoundComponent extends AbstractComponent {
    public commodityTypePower = CommodityTypesLowerCase.POWER;
    public subjectTypeIndividual = SubjectTypeLowerCase.INDIVIDUAL;

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

    constructor(private authService: AuthService) {
        super();
    }

    public homeRedirect = (evt) => {
        evt.preventDefault();
        this.authService.homeRedirect();
    };
}
