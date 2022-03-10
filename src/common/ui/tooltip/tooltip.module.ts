import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DirectivesModule } from 'src/common/directives/directives.module';
// own compoents
import { TooltipComponent } from './tooltip.component';

@NgModule({
    declarations: [TooltipComponent],
    imports: [CommonModule, DirectivesModule],
    exports: [TooltipComponent],
})
export class TooltipModule {}
