import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { changePasswordFields } from 'src/common/containers/form/forms/change-password/change-password-form.config';
import { IFieldError } from 'src/common/containers/form/models/form-definition.model';
import { ROUTES } from '../../app.constants';

@Component({
    selector: 'pxe-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent {
    public formFields = changePasswordFields;
    public formSent = false;
    public globalError: string[] = [];
    public fieldError: IFieldError = {};
    public formLoading = false;

    public isPasswordChanged = false;

    public bannerImageSrc = '/assets/images/illustrations/accepted.svg';
    public bannerTitle = 'Vaše heslo bylo úspěšně změněno';
    public buttonLabel = 'Pokračovat';

    constructor(
        private router: Router,
    ) {}

    public continueToDashboard = (evt) => {
        evt.preventDefault();
        this.router.navigate([ROUTES.ROUTER_DASHBOARD]);
    }

    public submitChangePasswordForm = (evt) => {
        this.isPasswordChanged = true;
        console.log('zkontrolovat jestli se zmeni prizkaz v tokenu pro guard (jinak ho to presmeruje na sebe)');
    }
}
