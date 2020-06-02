import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LineGraphComponent } from './line-graph/line-graph.component';

@NgModule({
    declarations: [
        LineGraphComponent,
    ],
    imports: [
        CommonModule,
    ],
})
export class GraphsModule { }
