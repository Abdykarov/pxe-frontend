import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertModule } from 'src/common/ui/alert/alert.module';
import { ChangePasswordFormModule } from 'src/common/containers/form/forms/change-password/change-password-form.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';
import { UserChangePasswordComponent } from 'src/app/pages/user-change-password/user-change-password.component';
import { UserChangePasswordRouting } from 'src/app/pages/user-change-password/user-change-password.routing';

@NgModule({
    declarations: [
        UserChangePasswordComponent,
    ],
    exports: [
        UserChangePasswordComponent,
    ],
    imports: [
        AlertModule,
        CommonModule,
        LayoutContainerModule,
        PlaceloaderModule,
        ChangePasswordFormModule,
        UserChangePasswordRouting,
    ],
})
export class UserChangePasswordModule { }
