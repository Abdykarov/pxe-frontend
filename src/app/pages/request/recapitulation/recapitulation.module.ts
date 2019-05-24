import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { RecapitulationComponent } from './recapitulation.component';
import { RecapitulationRoutingModule } from './recapitulation.routing';
import { ProgressBarModule } from '../../../../common/ui/progress-bar/progress-bar.module';

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
