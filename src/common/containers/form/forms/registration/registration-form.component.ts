import { Component, Input, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EnvironmentService } from 'src/app/services/environment.service';
import { OAuthType } from 'src/app/services/model/o-auth.model';
import { OAuthService } from 'src/app/services/o-auth.service';
import { SAnalyticsService } from 'src/app/services/s-analytics.service';
import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';

@Component({
    selector: 'pxe-registration-form',
    templateUrl: './registration-form.component.html',
    styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent
    extends AbstractFormComponent
    implements OnDestroy
{
    public readonly oAuthType = OAuthType;

    @Input()
    public bubbleText;

    @Input()
    public isSignUp = true;

    @Input()
    public lightTheme = false;

    constructor(
        public environmentService: EnvironmentService,
        public sAnalyticsService: SAnalyticsService,
        public oauthService: OAuthService,
        protected fb: FormBuilder
    ) {
        super(fb);
        sAnalyticsService.sFormStart();
    }

    public submitValidForm = () => {
        const val = this.form.value;
        val.preregistration = !this.isSignUp;
        val.consent = true;
        this.submitAction.emit(val);
    };

    ngOnDestroy() {
        super.ngOnDestroy();
        this.sAnalyticsService.sFormEnd();
    }
}
