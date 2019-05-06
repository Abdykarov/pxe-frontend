import {
    ChangeDetectorRef,
    Component,
} from '@angular/core';
import { Router } from '@angular/router';

import { AbstractComponent } from 'src/common/abstract.component';
import { AuthService } from 'src/app/services/auth.service';
import { loginFormFields } from './login.config';
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
                    this.router.navigate(['/secured/supply-points/new-supply-point']);
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
        window.open('/forgotten-password');
    }
}
