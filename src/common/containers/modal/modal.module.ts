import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AddModalDirective } from './add-modal.directive';
import { ModalComponent } from './modal.component';
import { ConfirmModalModule } from './modals/confirm/confirm-modal.module';
import { HelpModalModule } from './modals/help/help-modal.module';
import { LpVideoModalModule } from './modals/lp-video/lp-video-modal.module';

@NgModule({
    declarations: [AddModalDirective, ModalComponent],
    exports: [
        ConfirmModalModule,
        HelpModalModule,
        LpVideoModalModule,
        ModalComponent,
    ],
    imports: [CommonModule],
})
export class ModalModule {}
