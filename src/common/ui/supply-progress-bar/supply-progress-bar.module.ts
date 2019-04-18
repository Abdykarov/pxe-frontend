import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SupplyProgressBarComponent } from './supply-progress-bar.component';

@NgModule({
    declarations: [
        SupplyProgressBarComponent,
    ],
    exports: [
        SupplyProgressBarComponent,
    ],
    imports: [
        CommonModule,
    ],
})
export class SupplyProgressBarModule {}
