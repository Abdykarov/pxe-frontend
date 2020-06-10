import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BarPlotComponent } from 'src/common/ui/graphs/bar-plot/bar-plot.component';
import { ProgressBarComponent } from 'src/common/ui/graphs/progress-bar/progress-bar.component';
import { LineGraphComponent } from './line-graph/line-graph.component';

@NgModule({
    declarations: [
        BarPlotComponent,
        LineGraphComponent,
        ProgressBarComponent,
    ],
    exports: [
        BarPlotComponent,
        LineGraphComponent,
        ProgressBarComponent,
    ],
    imports: [
        CommonModule,
    ],
})
export class GraphsModule { }
