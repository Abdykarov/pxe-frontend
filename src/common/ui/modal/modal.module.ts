import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalComponent } from './modal.component';

@NgModule({
    declarations: [ModalComponent],
    exports: [ModalComponent],
    imports: [CommonModule],
})
export class ModalModule {}
