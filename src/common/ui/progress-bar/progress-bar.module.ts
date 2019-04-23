import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProgressBarComponent } from './progress-bar.component';

@NgModule({
    declarations: [
        ProgressBarComponent,
    ],
    exports: [
        ProgressBarComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
    ],
})
export class ProgressBarModule {}
