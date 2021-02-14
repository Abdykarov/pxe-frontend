import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TableComponent } from './table.component';

// own modules
import { ButtonModule } from 'src/common/ui/button/button.module';
import { PipesModule } from 'src/common/pipes/pipes.module';

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
        PipesModule,
    ],
})
export class TableModule {}
