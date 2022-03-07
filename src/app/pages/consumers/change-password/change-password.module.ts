import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChangePasswordComponent } from 'src/app/pages/consumers/change-password/change-password.component';
import { ChangePasswordRouting } from 'src/app/pages/consumers/change-password/change-password.routing';
import { ChangePasswordFormModule } from 'src/common/containers/form/forms/change-password/change-password-form.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { AlertModule } from 'src/common/ui/alert/alert.module';
import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';

@NgModule({
    declarations: [ChangePasswordComponent],
    exports: [ChangePasswordComponent],
    imports: [
        AlertModule,
        CommonModule,
        LayoutContainerModule,
        PlaceloaderModule,
        ChangePasswordFormModule,
        ChangePasswordRouting,
    ],
})
export class ChangePasswordModule {}
