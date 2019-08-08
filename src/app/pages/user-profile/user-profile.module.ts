import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { AlertModule } from 'src/common/ui/alert/alert.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';
import { UserProfileComponent } from 'src/app/pages/user-profile/user-profile.component';
import { UserProfileFormModule } from 'src/common/containers/form/forms/user-profile/user-profile-form.module';
import { UserProfileRouting } from 'src/app/pages/user-profile/user-profile.routing';

@NgModule({
    declarations: [
        UserProfileComponent,
    ],
    exports: [
        UserProfileComponent,
    ],
    imports: [
        AlertModule,
        CommonModule,
        LayoutContainerModule,
        PlaceloaderModule,
        UserProfileFormModule,
        UserProfileRouting,
    ],
})
export class UserProfileModule { }
