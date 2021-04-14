import {
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';

import { RecaptchaComponent } from 'ng-recaptcha';

import { ReCaptchaService } from 'src/common/containers/re-captcha/re-captcha.service';

@Component({
    selector: 'pxe-re-captcha-initializer',
    templateUrl: './re-captcha-initializer.component.html',
})
export class ReCaptchaInitializerComponent implements OnInit, OnDestroy {

    @ViewChild('captchaRef', { static: true })
    public captchaRef: RecaptchaComponent;

    constructor(
       private reCaptchaService: ReCaptchaService,
    ) {}

    public ngOnInit(): void {
        this.reCaptchaService.setReCaptcha(this.captchaRef);
    }

    public ngOnDestroy(): void {
        this.reCaptchaService.setReCaptcha(null);
    }

    public resolve(code: string = ''): void {
        this.reCaptchaService.resolve(code);
    }
}

