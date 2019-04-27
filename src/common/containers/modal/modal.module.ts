import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddModalDirective } from './add-modal.directive';
import { ModalComponent } from './modal.component';

@NgModule({
    declarations: [
        AddModalDirective,
        ModalComponent,
    ],
    exports: [
        ModalComponent,
    ],
    imports: [
        CommonModule,
    ],
})
export class ModalModule {}
