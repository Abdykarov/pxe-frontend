import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReCaptchaComponent } from './re-captcha/re-captcha.component';
import { ReCaptchaInitializerComponent } from './initializer/re-captcha-initializer.component';
import { RecaptchaModule as NgReCaptchaModule } from 'ng-recaptcha';

@NgModule({
    declarations: [
        ReCaptchaComponent,
        ReCaptchaInitializerComponent,
    ],
    imports: [
        CommonModule,
        NgReCaptchaModule,
    ],
    exports: [
        ReCaptchaComponent,
        ReCaptchaInitializerComponent,
    ],
})
export class ReCaptchaModule {}
