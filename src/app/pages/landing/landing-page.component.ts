import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';

import * as R from 'ramda';
import { Apollo } from 'apollo-angular';
import { takeUntil } from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { AuthService } from 'src/app/services/auth.service';
import { OverlayService } from 'src/common/graphql/services/overlay.service';
import { ScrollRegisterService } from 'src/app/layouts/public/services/scroll-register';

import { loginFormFields } from './landing-page.config';

@Component({
    selector: 'lnd-landing-page',
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LandingPageComponent extends AbstractComponent {
    public loginError = false;
    public loginForm: FormGroup;
    public loginLoading = false;
    public showLogin = false;

    @ViewChild('pxe_subscription_form') pxeSubscriptionForm: ElementRef;

    constructor(
        private apollo: Apollo,
        private authService: AuthService,
        private cd: ChangeDetectorRef,
        private fb: FormBuilder,
        private overlayService: OverlayService,
        private router: Router,
        private scrollRegisterService: ScrollRegisterService,
    ) {
        super();
        this.loginForm = this.fb.group(loginFormFields);

        scrollRegisterService.clickedOnRegistrationStream().subscribe(() => {
            this.pxeSubscriptionForm.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }

    public submitLoginForm = () => {
        R.pipe(
            R.keys,
            R.map((field) => {
                this.loginForm
                    .get(field)
                    .markAsTouched({
                        onlySelf: true,
                    });
            }),
        )(this.loginForm.controls);
        if (this.loginForm.valid) {
            this.loginLoading = true;
            this.loginError = false;
            this.authService
                .login(this.loginForm.value)
                .subscribe(
                    () => {
                        this.router.navigate(['/secured']);
                    },
                    error => {
                        this.loginError = true;
                        this.loginLoading = false;
                        this.cd.markForCheck();
                    });
        }
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
