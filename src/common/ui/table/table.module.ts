import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableComponent } from './table.component';

// own modules
import { ButtonModule } from '../button/button.module';

@NgModule({
    declarations: [
        TableComponent,
    ],
    exports: [
        TableComponent,
    ],
    imports: [
        ButtonModule,
        CommonModule,
    ],
})
export class TableModule {}
