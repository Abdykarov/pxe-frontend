import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SupplierProfileFormModule } from 'src/common/containers/form/forms/supplier-profile/supplier-profile-form.module';
import { UserProfileFormModule } from 'src/common/containers/form/forms/user-profile/user-profile-form.module';

import { AlertModule } from 'src/common/ui/alert/alert.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';
import { SupplierProfileComponent } from 'src/app/pages/suppliers/supplier-profile/supplier-profile.component';
import { SupplierProfileRouting } from 'src/app/pages/suppliers/supplier-profile/supplier-profile.routing';

@NgModule({
    declarations: [
        SupplierProfileComponent,
    ],
    exports: [
        SupplierProfileComponent,
    ],
    imports: [
        AlertModule,
        ButtonModule,
        CommonModule,
        LayoutContainerModule,
        PlaceloaderModule,
        SupplierProfileFormModule,
        SupplierProfileRouting,
        UserProfileFormModule,
    ],
})
export class SupplierProfileModule { }
