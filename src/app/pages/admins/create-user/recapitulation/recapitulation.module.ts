import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from 'src/common/ui/button/button.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { PersonalInfoFormModule } from 'src/common/containers/form/forms/personal-info/personal-info-form.module';
import { RecapitulationComponent } from './recapitulation.component';
import { RecapitulationRoutingModule } from './recapitulation.routing';

@NgModule({
    declarations: [
        RecapitulationComponent,
    ],
    imports: [
        ButtonModule,
        CommonModule,
        LayoutContainerModule,
        PersonalInfoFormModule,
        RecapitulationRoutingModule,
    ],
})
export class RecapitulationModule {}
