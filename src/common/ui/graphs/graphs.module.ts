import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BarPlotComponent } from 'src/common/ui/graphs/bar-plot/bar-plot.component';
import { LineGraphComponent } from './line-graph/line-graph.component';

@NgModule({
    declarations: [
        BarPlotComponent,
        LineGraphComponent,
    ],
    exports: [
        BarPlotComponent,
        LineGraphComponent,
    ],
    imports: [
        CommonModule,
    ],
})
export class GraphsModule { }
