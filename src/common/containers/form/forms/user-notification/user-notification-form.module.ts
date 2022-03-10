import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerificationFormModule } from 'src/common/containers/form/forms/verification/verification-form.module';
import { PipesModule } from 'src/common/pipes/common/pipes.module';
import { AlertModule } from 'src/common/ui/alert/alert.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { FieldWrapperModule } from 'src/common/ui/forms/field-wrapper/field-wrapper.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { UserNotificationFormComponent } from './user-notification-form.component';

@NgModule({
    declarations: [UserNotificationFormComponent],
    exports: [UserNotificationFormComponent],
    imports: [
        AlertModule,
        ButtonModule,
        CommonModule,
        FieldWrapperModule,
        FormModule,
        FormsModule,
        PipesModule,
        ReactiveFormsModule,
        VerificationFormModule,
    ],
})
export class UserNotificationFormModule {}
