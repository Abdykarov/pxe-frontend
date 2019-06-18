import { ActivatedRoute } from '@angular/router';
import {
    Component,
    EventEmitter,
    Inject,
    Input,
    OnInit,
    Output,
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
    public passwordWasSent = false;

    @Input()
    public email = '';

    @Input()
    public wasSentToPhone = false;

    @Output()
    public forgottenPasswordAction?: EventEmitter<any> = new EventEmitter<any>();

    public handleForgottenPasswordAction = ($event) => this.forgottenPasswordAction.emit($event);

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
                if (this.email  === '') {
                    this.email = params['email'];
                }
                if (this.email) {
                    const formValue = this.form.value;
                    formValue.email = this.email;
                    this.form.setValue(formValue);
                }
            });
        if (isPlatformBrowser(this.platformId) && !this.passwordWasSent) {
            this.passwordWasSent = !!window.history.state.passwordWasSent;
        }
    }
}
