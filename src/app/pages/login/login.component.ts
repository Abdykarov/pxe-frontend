import {
    ChangeDetectorRef,
    Component,
} from '@angular/core';
import { Router } from '@angular/router';

import { takeUntil } from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { AuthService } from 'src/app/services/auth.service';
import { loginFormFields } from './login.config';
import { OverlayService } from 'src/common/graphql/services/overlay.service';
import { parseRestAPIErrors } from '../../../common/utils/parse-rest-erros.fns';

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent extends AbstractComponent {
    public loginLoading = false;
    public showLogin = false;

    public loginFormFields = loginFormFields;
    public submitLoginFormLoading = false;
    public loginGlobalError: string[] = [];

    public error;

    constructor(
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private overlayService: OverlayService,
        private router: Router,
    ) {
        super();
    }

    public submitLoginForm = (values) => {

        console.log('%c ***** VALUE *****', 'background: #bada55; color: #000; font-weight: bold', values);

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
                        this.error = error;
                        const message = parseRestAPIErrors(error);
                        console.log('%c ***** VALUE *****', 'background: #bada55; color: #000; font-weight: bold', error);
                        this.submitLoginFormLoading = false;
                        this.loginGlobalError.push(message);
                        this.cd.markForCheck();
                    });

    }

    public toggleLoginDialog = () => {
        if (!this.loginLoading) {
            this.showLogin = !this.showLogin;
            this.overlayService.toggleOverlay()
                .pipe(
                    takeUntil(this.destroy$),
                )
                .subscribe();
        }
    }
}
