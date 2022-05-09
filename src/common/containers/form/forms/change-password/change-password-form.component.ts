import {
    Component,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as R from 'ramda';
import { interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CONSTS } from 'src/app/app.constants';
import { AuthService } from 'src/app/services/auth.service';
import { CookiesService } from 'src/app/services/cookies.service';
import { IUserRoles } from 'src/app/services/model/auth.model';
import { SAnalyticsService } from 'src/app/services/s-analytics.service';
import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';

@Component({
    selector: 'pxe-change-password-form',
    templateUrl: './change-password-form.component.html',
    styleUrls: ['./change-password-form.component.scss'],
})
export class ChangePasswordFormComponent
    extends AbstractFormComponent
    implements OnInit, OnChanges, OnDestroy
{
    @Input()
    public isPublic = true;

    public form: FormGroup;

    constructor(
        private authService: AuthService,
        private cookieService: CookiesService,
        protected fb: FormBuilder,
        private ngZone: NgZone,
        private router: Router,
        private sAnalyticsService: SAnalyticsService
    ) {
        super(fb);
    }

    ngOnInit() {
        super.ngOnInit();
        this.sAnalyticsService.sFormStart();
        this.form = this.fb.group(
            this.formFields.controls,
            this.formFields.options
        );
        if (this.isPublic) {
            this.setDisableField('currentPassword');
            this.ngZone.runOutsideAngular(() => {
                interval(1000)
                    .pipe(takeUntil(this.destroy$))
                    .subscribe((_) => {
                        const userToken = this.cookieService.get(
                            CONSTS.STORAGE_HELPERS.USER
                        );
                        if (
                            !userToken ||
                            !AuthService.jwtTokenHasRoles(userToken, [
                                IUserRoles.RESET_PASSWORD,
                            ])
                        ) {
                            this.ngZone.run(() => {
                                this.router.navigate([CONSTS.PATHS.EMPTY]);
                            });
                        }
                    });
            });
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);
        if (changes.formSent && changes.formSent.currentValue && this.form) {
            const defaultValues = R.map(R.head, this.formFields.controls);
            this.form.reset(defaultValues);
            this.resetFormError(false);
        }
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.sAnalyticsService.sFormEnd();
    }
}
