import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DirectivesModule } from 'src/common/directives/directives.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { ModalModule } from 'src/common/ui/modal/modal.module';
import { ConfirmModalComponent } from './confirm-modal.component';

@NgModule({
    declarations: [ConfirmModalComponent],
    imports: [ButtonModule, CommonModule, DirectivesModule, ModalModule],
    exports: [ConfirmModalComponent],
})
export class ConfirmModalModule {}
