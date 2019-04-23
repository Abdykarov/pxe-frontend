import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

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
        RouterModule,
    ],
})
export class SupplyProgressBarModule {}
