import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DirectivesModule } from 'src/common/directives/directives.module';
// own modules
import { ButtonModule } from 'src/common/ui/button/button.module';
// own components
import { MicroTableComponent } from './micro-table.component';

@NgModule({
    declarations: [MicroTableComponent],
    imports: [CommonModule, DirectivesModule],
    exports: [ButtonModule, MicroTableComponent],
})
export class MicroTableModule {}
