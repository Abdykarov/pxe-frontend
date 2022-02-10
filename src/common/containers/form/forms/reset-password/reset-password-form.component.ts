import { Component, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CONSTS } from 'src/app/app.constants';
import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';
import { SAnalyticsService } from 'src/common/services/s-analytics.service';

@Component({
    selector: 'pxe-reset-password-form',
    templateUrl: './reset-password-form.component.html',
    styleUrls: ['./reset-password-form.component.scss'],
})
export class ResetPasswordFormComponent
    extends AbstractFormComponent
    implements OnDestroy
{
    public readonly LOGIN_FORM_NAME = CONSTS.LOGIN_FORM_NAME;

    constructor(
        protected fb: FormBuilder,
        private sAnalyticsService: SAnalyticsService
    ) {
        super(fb);
        sAnalyticsService.sFormStart();
    }

    ngOnDestroy() {
        super.ngOnInit();
        this.sAnalyticsService.sFormEnd();
    }
}
