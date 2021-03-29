import {
    Component,
    Input,
    OnDestroy,
    TemplateRef,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
import { OAuthService } from 'src/app/services/OAuth.service';
import { OAuthType } from 'src/app/models/oAuth/oAuth.model';
import { SAnalyticsService } from 'src/app/services/s-analytics.service';

@Component({
    selector: 'pxe-registration-form',
    templateUrl: './registration-form.component.html',
    styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent extends AbstractFormComponent implements OnDestroy {
    public readonly oAuthType = OAuthType;

    @Input()
    public bubbleText;

    @Input()
    public isSignUp = true;

    @Input()
    public lightTheme = false;

    @Input()
    public agreementTemplate: TemplateRef<any>;

    constructor(
        public sAnalyticsService: SAnalyticsService,
        public oauthService: OAuthService,
        protected fb: FormBuilder,
    ) {
        super(fb);
        sAnalyticsService.sFormStart();
    }

    public submitValidForm = () => {
        const val = this.form.value;
        val.preregistration = !this.isSignUp;
        this.submitAction.emit(val);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.sAnalyticsService.sFormEnd();
    }
}
