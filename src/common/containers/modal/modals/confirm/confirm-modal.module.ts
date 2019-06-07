import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmModalComponent } from './confirm-modal.component';

import { ButtonModule } from 'src/common/ui/button/button.module';
import { ModalModule } from 'src/common/ui/modal/modal.module';

@NgModule({
    declarations: [
        ConfirmModalComponent,
    ],
    entryComponents: [
        ConfirmModalComponent,
    ],
    imports: [
        ButtonModule,
        CommonModule,
        ModalModule,
    ],
    exports: [
        ConfirmModalComponent,
    ],
})
export class ConfirmModalModule {}
