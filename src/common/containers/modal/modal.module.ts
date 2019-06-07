import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddModalDirective } from './add-modal.directive';
import { ConfirmModalModule } from './modals/confirm/confirm-modal.module';
import { HelpModalModule } from './modals/help/help-modal.module';
import { ModalComponent } from './modal.component';

@NgModule({
    declarations: [
        AddModalDirective,
        ModalComponent,
    ],
    exports: [
        ConfirmModalModule,
        HelpModalModule,
        ModalComponent,
    ],
    imports: [
        CommonModule,
    ],
})
export class ModalModule {}
