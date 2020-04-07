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
import { CONSTS } from 'src/app/app.constants';

@Component({
    selector: 'pxe-login-form',
    templateUrl: './login-form.component.html',
    styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent extends AbstractFormComponent implements OnInit {

    public readonly LOGIN_FORM_NAME = CONSTS.LOGIN_FORM_NAME;

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

    public handleReSentAction = () => this.reSentAction.emit(this.login);

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
}
