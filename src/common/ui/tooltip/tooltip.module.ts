import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// own compoents
import { TooltipComponent } from './tooltip.component';
import { DirectivesModule } from 'src/common/directives/directives.module';

@NgModule({
    declarations: [
        TooltipComponent,
    ],
    imports: [
        CommonModule,
        DirectivesModule,
    ],
    exports: [
        TooltipComponent,
    ],
})
export class TooltipModule {}
