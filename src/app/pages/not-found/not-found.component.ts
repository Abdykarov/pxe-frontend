import { Component } from '@angular/core';

import { AbstractComponent } from 'src/common/abstract.component';
import { AuthService } from 'src/app/services/auth.service';
import {
    CommodityTypesLowerCase,
    CONSTS,
    SubjectTypeLowerCase,
} from 'src/app/app.constants';
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
    public readonly CONSTS = CONSTS;

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
