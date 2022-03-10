import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PipesModule } from 'src/common/pipes/common/pipes.module';
// own modules
import { ButtonModule } from 'src/common/ui/button/button.module';
import { TableComponent } from './table.component';

@NgModule({
    declarations: [TableComponent],
    exports: [TableComponent],
    imports: [ButtonModule, CommonModule, PipesModule],
})
export class TableModule {}
