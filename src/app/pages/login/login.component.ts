import {
    ChangeDetectorRef,
    Component,
} from '@angular/core';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';

import { AbstractComponent } from 'src/common/abstract.component';
import { AuthService } from 'src/app/services/auth.service';
import {
    loginFormFields,
    loginSupplyAuthFormFields,
} from './login.config';
import { OverlayService } from 'src/common/graphql/services/overlay.service';
import { parseRestAPIErrors } from 'src/common/utils/';


const jwtHelperService = new JwtHelperService();

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends AbstractComponent {
    public loginFormFields = loginFormFields;
    public loginSupplyAuthFields = loginSupplyAuthFormFields;

    public loginGlobalError: string[] = [];

    public submitLoginFormLoading = false;

    public wasSentSms = false;

    constructor(
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private overlayService: OverlayService,
        private router: Router,
    ) {
        super();
    }

    public submitFormLogin = (values) => {
        this.submitLoginFormLoading = true;
        this.loginGlobalError = [];
        this.authService
            .login(values)
            .subscribe(
                respone => {
                    // isdodavatel
                    // if()
                    this.sendSms(respone.token);


                    // this.submitLoginFormLoading = false;
                    // this.router.navigate(['/secured/request/supply-point']);
                },
                error => {
                    const message = parseRestAPIErrors(error);
                    this.submitLoginFormLoading = false;
                    this.loginGlobalError.push(message);
                    this.cd.markForCheck();
                });

    }

    public submitFormLoginAuth = (values) => {
        this.authService
            .login(values)
            .subscribe(
                () => {

                    // this.submitLoginFormLoading = false;
                    // this.router.navigate(['/secured/request/supply-point']);
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
        window.open('/forgotten-password');
    }

    public sendSms(token: string) {
        this.wasSentSms = true;
        this.authService.confirm(token).subscribe();

        // this.authService.sendSms(token).subscribe(res => {
        //     console.log(res);
        //     this.authService.confirm(res.token).subscribe();
        // });
    }

    public reSendSms = ($event) => {
        this.wasSentSms = true; // todo odstranit po implemtaci sluzeb/mocku
        $event.preventDefault();
        console.log('resendsms');
    }

}
