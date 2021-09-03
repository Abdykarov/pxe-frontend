import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// own components
import { MicroTableComponent } from './micro-table.component';

// own modules
import { ButtonModule } from 'src/common/ui/button/button.module';
import { DirectivesModule } from 'src/common/directives/directives.module';

@NgModule({
    declarations: [
        MicroTableComponent,
    ],
    imports: [
        CommonModule,
        DirectivesModule,
    ],
    exports: [
        ButtonModule,
        MicroTableComponent,
    ],
})
export class MicroTableModule {}
