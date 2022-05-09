import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractFormComponent } from 'src/common/containers/form/abstract-form.component';

@Component({
    selector: 'pxe-user-notification-form',
    templateUrl: './user-notification-form.component.html',
    styleUrls: ['./user-notification-form.component.scss'],
})
export class UserNotificationFormComponent
    extends AbstractFormComponent
    implements OnInit
{
    @Input()
    public isNotificationsAllowed = false;

    @Input()
    public formValues = null;

    constructor(protected fb: FormBuilder) {
        super(fb);
    }

    ngOnInit() {
        super.ngOnInit();

        this.prefillForm();
    }

    public prefillForm = () => {
        if (this.formValues?.notificatiosAllowed !== undefined) {
            this.form.controls['notificatiosAllowed'].setValue(
                this.formValues?.notificatiosAllowed
            );
        }
    };
}
