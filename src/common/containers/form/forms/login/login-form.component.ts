import { ActivatedRoute } from '@angular/router';
import {
    Component,
    Inject, Input,
    OnInit,
    PLATFORM_ID,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

import { takeUntil } from 'rxjs/operators';

import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';

@Component({
    selector: 'pxe-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent extends AbstractFormComponent implements OnInit {
    @Input()
    public showPasswordSend = false;

    @Input()
    public contactInfo = '';

    @Input()
    public isSendToTelephone = false;

    constructor(
        protected fb: FormBuilder,
        private route: ActivatedRoute,
        @Inject(PLATFORM_ID) private platformId: string,
    ) {
        super(fb);
    }

    ngOnInit() {
        super.ngOnInit();
        this.route.queryParams
            .pipe(
                takeUntil(this.destroy$),
            )
            .subscribe(params => {
                if (this.contactInfo  === '') {
                    this.contactInfo = params['email'];
                }
                if (this.contactInfo && !this.isSendToTelephone) {
                    const formValue = this.form.value;
                    formValue.email = this.contactInfo;
                    this.form.setValue(formValue);
                }
            });
        if (isPlatformBrowser(this.platformId) && !this.showPasswordSend) {
            this.showPasswordSend = !!window.history.state.showPasswordSend;
        }
    }
}
