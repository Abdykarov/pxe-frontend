import {
    ChangeDetectorRef,
    Component,
} from '@angular/core';
import { Router } from '@angular/router';

import { AbstractComponent } from 'src/common/abstract.component';
import { AuthService } from 'src/app/services/auth.service';
import {
    CONSTS,
    ROUTES,
} from 'src/app/app.constants';
import { loginFormFields } from 'src/common/containers/form/forms/login/login-form.config';
import { OverlayService } from 'src/common/graphql/services/overlay.service';
import { parseRestAPIErrors } from 'src/common/utils/';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends AbstractComponent {
    public formFields = loginFormFields;
    public globalError: string[] = [];
    public formLoading = false;

    constructor(
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private router: Router,
    ) {
        super();
    }

    public submitForm = (values) => {
        this.formLoading = true;
        this.globalError = [];
        this.authService
            .login(values)
            .subscribe(
                () => {
                    this.formLoading = false;
                    this.router.navigate([ROUTES.ROUTER_SECURED_REQUEST_SUPPLY_POINT]);
                },
                error => {
                    const message = parseRestAPIErrors(error);
                    this.formLoading = false;
                    this.globalError.push(message);
                    this.cd.markForCheck();
                });
    }

    public forgottenPasswordAction = ($event) => {
        $event.preventDefault();
        window.open(CONSTS.PATHS.FORGOTTEN_PASSWORD);
    }
}
