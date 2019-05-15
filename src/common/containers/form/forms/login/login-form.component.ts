import { ActivatedRoute } from '@angular/router';
import {
    Component,
    Inject,
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
    public isFromSignUp = false;
    public email = '';

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
                this.email = params['email'];
                if (this.email) {
                    const formValue = this.form.value;
                    formValue.username = this.email;
                    this.form.setValue(formValue);
                }
            });
        if (isPlatformBrowser(this.platformId)) {
            this.isFromSignUp = !!window.history.state.isFromSignUp;
        }
    }
}
