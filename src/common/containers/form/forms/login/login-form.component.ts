import { ActivatedRoute } from '@angular/router';
import {
    Component,
    EventEmitter,
    Inject,
    Input, OnDestroy,
    OnInit,
    Output,
    PLATFORM_ID,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

import { takeUntil } from 'rxjs/operators';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
import { CONSTS } from 'src/app/app.constants';
import { Environment } from 'src/app/models/environment/oAuth.model';
import { EnvironmentService } from 'src/app/services/environment.service';
import { OAuthService } from 'src/app/services/OAuth.service';
import { OAuthType } from 'src/app/models/o-auth/oAuth.model';
import { SAnalyticsService } from 'src/app/services/s-analytics.service';

@Component({
    selector: 'pxe-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent extends AbstractFormComponent implements OnInit, OnDestroy {
    public readonly isProduction = this.environmentService.is(Environment.PROD);
    public readonly LOGIN_FORM_NAME = CONSTS.LOGIN_FORM_NAME;
    public readonly oAuthType = OAuthType;

    @Input()
    public passwordWasSent = false;

    @Input()
    public login = '';

    @Input()
    public wasSentToPhone = false;

    @Input()
    public reasonForLogoutUser = '';

    @Output()
    public reSentAction?: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        public environmentService: EnvironmentService,
        protected fb: FormBuilder,
        public oauthService: OAuthService,
        public sAnalyticsService: SAnalyticsService,
        private route: ActivatedRoute,
        @Inject(PLATFORM_ID) private platformId: string,
    ) {
        super(fb);
    }

    public handleReSentAction = () => {
        this.form.controls['password'].setValue('');
        this.resetFormError(false);
        return this.reSentAction.emit(this.login);
    }

    ngOnInit() {
        super.ngOnInit();
        this.sAnalyticsService.sFormStart();
        this.route.queryParams
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(params => {
                if (this.login  === '') {
                    this.login = params['email'];
                }
                if (this.login) {
                    const formValue = this.form.value;
                    formValue.login = this.login;
                    this.form.setValue(formValue);
                }
            });

        if (isPlatformBrowser(this.platformId) && !this.passwordWasSent) {
            this.passwordWasSent = !!window.history.state.passwordWasSent;
        }
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.sAnalyticsService.sFormEnd();
    }
}
