import {
    ChangeDetectorRef,
    Component,
} from '@angular/core';
import { Router } from '@angular/router';

import { AbstractComponent } from 'src/common/abstract.component';
import { AuthService } from 'src/app/services/auth.service';
import { loginFormFields } from './login.config';
import { OverlayService } from 'src/common/graphql/services/overlay.service';
import { parseRestAPIErrors } from 'src/common/utils/';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login-page.component.scss'],
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

    public submitLoginForm = (values) => {
        this.submitLoginFormLoading = true;
        this.loginGlobalError = [];
        this.authService
            .login(values)
            .subscribe(
                () => {
                    this.submitLoginFormLoading = false;
                    this.router.navigate(['/secured']);
                },
                error => {
                    const message = parseRestAPIErrors(error);
                    this.submitLoginFormLoading = false;
                    this.loginGlobalError.push(message);
                    this.cd.markForCheck();
                });

    }
}
