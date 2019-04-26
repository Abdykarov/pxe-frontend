import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// own classes
import { ShowImageModalComponent } from './show-image-modal.component';

// own module
import { ButtonModule } from 'src/common/ui/button/button.module';
import { ModalModule } from 'src/common/ui/modal/modal.module';

@NgModule({
    declarations: [
        ShowImageModalComponent,
    ],
    entryComponents: [
        ShowImageModalComponent,
    ],
    imports: [
        ButtonModule,
        CommonModule,
        ModalModule,
    ],
    exports: [
        ShowImageModalComponent,
    ],
})
export class ShowImageModalModule {}
