import {
    ChangeDetectorRef,
    Component,
} from '@angular/core';
import { Router } from '@angular/router';

import { AbstractComponent } from 'src/common/abstract.component';
import { AuthService } from 'src/app/services/auth.service';
import { FORGOTTEN_PASSWORD } from 'src/app/routes/paths';
import { loginFormFields } from './login.config';
import { OverlayService } from 'src/common/graphql/services/overlay.service';
import { parseRestAPIErrors } from 'src/common/utils/';
import { ROUTER_SECURED_REQUEST_SUPPLY_POINT } from 'src/app/routes/routes';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends AbstractComponent {
    public loginFormFields = loginFormFields;
    public loginGlobalError: string[] = [];
    public submitLoginFormLoading = false;

    constructor(
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private overlayService: OverlayService,
        private router: Router,
    ) {
        super();
    }

    public submitForm = (values) => {
        this.submitLoginFormLoading = true;
        this.loginGlobalError = [];
        this.authService
            .login(values)
            .subscribe(
                () => {
                    this.submitLoginFormLoading = false;
                    this.router.navigate([ROUTER_SECURED_REQUEST_SUPPLY_POINT]);
                },
                error => {
                    const message = parseRestAPIErrors(error);
                    this.submitLoginFormLoading = false;
                    this.loginGlobalError.push(message);
                    this.cd.markForCheck();
                });

    }

    public forgottenPasswordAction = ($event) => {
        $event.preventDefault();
        window.open(FORGOTTEN_PASSWORD);
    }
}
