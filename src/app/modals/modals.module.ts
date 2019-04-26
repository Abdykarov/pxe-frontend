import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddModalDirective } from './add-modal.directive';
import { ModalsComponent } from './modals.component';
import { ShowImageModalModule } from './show-image-modal/show-image-modal.module';

@NgModule({
    declarations: [
        AddModalDirective,
        ModalsComponent,
    ],
    exports: [
        ModalsComponent,
        ShowImageModalModule,
    ],
    imports: [
        CommonModule,
    ],
})
export class ModalsModule {}
