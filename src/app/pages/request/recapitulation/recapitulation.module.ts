import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { ProgressBarModule } from 'src/common/ui/progress-bar/progress-bar.module';
import { RecapitulationComponent } from './recapitulation.component';
import { RecapitulationRoutingModule } from './recapitulation.routing';

@NgModule({
    declarations: [
        RecapitulationComponent,
    ],
    imports: [
        CommonModule,
        RecapitulationRoutingModule,
        LayoutContainerModule,
        ProgressBarModule,
    ],
})
export class RecapitulationModule { }
