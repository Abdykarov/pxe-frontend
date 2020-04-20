import {
    Component,
    Input,
    NgZone,
    OnInit,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
import { AuthService } from 'src/app/services/auth.service';
import { CONSTS } from 'src/app/app.constants';
import { CookiesService } from 'src/app/services/cookies.service';
import { IUserRoles } from 'src/app/services/model/auth.model';


@Component({
    selector: 'pxe-login-supply-auth-form',
    templateUrl: './login-supply-auth-form.component.html',
    styleUrls: ['./login-supply-auth-form.component.scss'],
})
export class LoginSupplyAuthFormComponent extends AbstractFormComponent implements OnInit {

    @Input()
    public telephoneNumber: string;

    constructor(
        private authService: AuthService,
        private cookieService: CookiesService,
        protected fb: FormBuilder,
        private ngZone: NgZone,
        private router: Router,
    ) {
        super(fb);

        this.ngZone.runOutsideAngular(() => {
            interval(1000)
                .pipe(
                    takeUntil(this.destroy$),
                )
                .subscribe(_ => {
                    const userToken = this.cookieService.get(this.authService.cookieName);
                    if (!userToken || !AuthService.jwtTokenHasRoles(userToken, [IUserRoles.NEEDS_SMS_CONFIRMATION])) {
                        this.router.navigate([CONSTS.PATHS.EMPTY]);
                    }
                });
        });
    }
}
