import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpModalComponent } from './help-modal.component';

import { ButtonModule } from 'src/common/ui/button/button.module';
import { ModalModule } from 'src/common/ui/modal/modal.module';

@NgModule({
    declarations: [
        HelpModalComponent,
    ],
    imports: [
        ButtonModule,
        CommonModule,
        ModalModule,
    ],
    exports: [
        HelpModalComponent,
    ],
})
export class HelpModalModule {}
