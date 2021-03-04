import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertModule } from 'src/common/ui/alert/alert.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { DeleteAccountComponent } from './delete-account.component';
import { DeleteAccountRoutingModule } from './delete-account-routing.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';
import { VerificationFormModule } from 'src/common/containers/form/forms/verification/verification-form.module';

@NgModule({
    declarations: [
        DeleteAccountComponent,
    ],
    imports: [
        AlertModule,
        ButtonModule,
        CommonModule,
        DeleteAccountRoutingModule,
        LayoutContainerModule,
        PlaceloaderModule,
        VerificationFormModule,
    ],
})
export class DeleteAccountModule { }
