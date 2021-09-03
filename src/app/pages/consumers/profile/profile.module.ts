import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertModule } from 'src/common/ui/alert/alert.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';
import { ProfileComponent } from 'src/app/pages/consumers/profile/profile.component';
import { UserProfileFormModule } from 'src/common/containers/form/forms/user-profile/user-profile-form.module';
import { ProfileRouting } from 'src/app/pages/consumers/profile/profile.routing';
import { UserNotificationFormModule } from 'src/common/containers/form/forms/user-notification/user-notification-form.module';

@NgModule({
    declarations: [
        ProfileComponent,
    ],
    exports: [
        ProfileComponent,
    ],
    imports: [
        AlertModule,
        ButtonModule,
        CommonModule,
        LayoutContainerModule,
        PlaceloaderModule,
        UserNotificationFormModule,
        UserProfileFormModule,
        ProfileRouting,
    ],
})
export class UserProfileModule { }
