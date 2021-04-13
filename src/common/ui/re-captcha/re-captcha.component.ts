import {
    Component,
    EventEmitter,
    Output,
    ViewChild,
} from '@angular/core';

import { RecaptchaComponent } from 'ng-recaptcha';

@Component({
    selector: 'pxe-re-captcha',
    templateUrl: './re-captcha.component.html',
    styleUrls: ['./re-captcha.component.scss'],
})

export class ReCaptchaComponent {

    public lastData = null;

    @ViewChild('captchaRef')
    public captchaRef: RecaptchaComponent;

    @Output()
    public resolveAction: EventEmitter<any> = new EventEmitter<any>();

    public execute(event) {
        console.log('EXECUTE');
        this.lastData = event;
        this.captchaRef.execute();
    }

    public reset() {
        setTimeout(_ => this.captchaRef.reset());
    }

    errored(event) {
        console.log(event);
    }
}

