import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LpVideoModalComponent } from './lp-video-modal.component';

import { ButtonModule } from 'src/common/ui/button/button.module';
import { ModalModule } from 'src/common/ui/modal/modal.module';

@NgModule({
    declarations: [
        LpVideoModalComponent,
    ],
    imports: [
        ButtonModule,
        CommonModule,
        ModalModule,
    ],
    exports: [
        LpVideoModalComponent,
    ],
})
export class LpVideoModalModule {}
