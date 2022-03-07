import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RecaptchaModule as NgReCaptchaModule } from 'ng-recaptcha';
import { ReCaptchaInitializerComponent } from './initializer/re-captcha-initializer.component';
import { ReCaptchaComponent } from './re-captcha/re-captcha.component';

@NgModule({
    declarations: [ReCaptchaComponent, ReCaptchaInitializerComponent],
    imports: [CommonModule, NgReCaptchaModule],
    exports: [ReCaptchaComponent, ReCaptchaInitializerComponent],
})
export class ReCaptchaModule {}
