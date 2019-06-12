import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { ChangePasswordComponent } from './change-password.component';
import { ChangePasswordFormModule } from 'src/common/containers/form/forms/change-password/change-password-form.module';
import { InfoBannerModule } from 'src/common/ui/info-banner/info-banner.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';

@NgModule({
    declarations: [
        ChangePasswordComponent,
    ],
    exports: [
        ChangePasswordComponent,
    ],
    imports: [
        CommonModule,
        ChangePasswordFormModule,
        ChangePasswordRoutingModule,
        InfoBannerModule,
        LayoutContainerModule,
    ],
})
export class ChangePasswordModule { }
