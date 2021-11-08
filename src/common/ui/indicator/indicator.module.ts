import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IndicatorComponent } from './indicator.component';

@NgModule({
    declarations: [IndicatorComponent],
    imports: [CommonModule],
    exports: [IndicatorComponent],
})
export class IndicatorModule {}
