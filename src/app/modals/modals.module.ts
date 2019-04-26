import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddModalDirective } from './add-modal.directive';
import { ModalsComponent } from './modals.component';

@NgModule({
    declarations: [
        AddModalDirective,
        ModalsComponent,
    ],
    exports: [
        ModalsComponent,
    ],
    imports: [
        CommonModule,
    ],
})
export class ModalsModule {}
