import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DetailContainerComponent } from './detail-container.component';

@NgModule({
    declarations: [
        DetailContainerComponent,
    ],
    exports: [
        DetailContainerComponent,
    ],
    imports: [
        CommonModule,
    ],
})
export class DetailContainerModule { }
