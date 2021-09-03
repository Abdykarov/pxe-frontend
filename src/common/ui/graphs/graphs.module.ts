import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BarPlotComponent } from 'src/common/ui/graphs/bar-plot/bar-plot.component';
import { GaussianDistributionComponent } from 'src/common/ui/graphs/gaussian-distribution/gaussian-distribution.component';
import { LineGraphComponent } from 'src/common/ui/graphs/line-graph/line-graph.component';
import { ProgressBarComponent } from 'src/common/ui/graphs/progress-bar/progress-bar.component';

@NgModule({
    declarations: [
        BarPlotComponent,
        GaussianDistributionComponent,
        LineGraphComponent,
        ProgressBarComponent,
    ],
    exports: [
        BarPlotComponent,
        GaussianDistributionComponent,
        LineGraphComponent,
        ProgressBarComponent,
    ],
    imports: [
        CommonModule,
    ],
})
export class GraphsModule { }
