import { Component, Input, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CONSTS } from 'src/app/app.constants';
import { AuthService } from 'src/app/services/auth.service';
import { CookiesService } from 'src/app/services/cookies.service';
import { IUserRoles } from 'src/app/services/model/auth.model';
import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';

@Component({
    selector: 'pxe-login-supply-auth-form',
    templateUrl: './login-supply-auth-form.component.html',
    styleUrls: ['./login-supply-auth-form.component.scss'],
})
export class LoginSupplyAuthFormComponent
    extends AbstractFormComponent
    implements OnInit
{
    @Input()
    public telephoneNumber: string;

    constructor(
        private authService: AuthService,
        private cookieService: CookiesService,
        protected fb: FormBuilder,
        private ngZone: NgZone,
        private router: Router
    ) {
        super(fb);

        this.ngZone.runOutsideAngular(() => {
            interval(1000)
                .pipe(takeUntil(this.destroy$))
                .subscribe((_) => {
                    const userToken = this.cookieService.get(
                        CONSTS.STORAGE_HELPERS.USER
                    );
                    if (
                        !userToken ||
                        !AuthService.jwtTokenHasRoles(userToken, [
                            IUserRoles.NEEDS_SMS_CONFIRMATION,
                        ])
                    ) {
                        this.ngZone.run(() => {
                            this.router.navigate([CONSTS.PATHS.EMPTY]);
                        });
                    }
                });
        });
    }
}
