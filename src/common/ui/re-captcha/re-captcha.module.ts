import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReCaptchaComponent } from './re-captcha.component';
import { RecaptchaModule as NgReCaptchaModule } from 'ng-recaptcha';

@NgModule({
    declarations: [
        ReCaptchaComponent,
    ],
    imports: [
        CommonModule,
        NgReCaptchaModule,
    ],
    exports: [
        ReCaptchaComponent,
    ],
})
export class ReCaptchaModule {}
