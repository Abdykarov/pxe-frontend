import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// own classes
import { HelpModalComponent } from './help-modal.component';

// own module
import { ButtonModule } from 'src/common/ui/button/button.module';
import { ModalModule } from 'src/common/ui/modal/modal.module';

@NgModule({
    declarations: [
        HelpModalComponent,
    ],
    entryComponents: [
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
