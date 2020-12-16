import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from 'src/common/ui/button/button.module';
import { LpPersonalizationContainerComponent } from './lp-personalization-container.component';
import { LpPersonalizationModule } from 'src/common/ui/lp-personalization/lp-personalization.module';


@NgModule({
    declarations: [
        LpPersonalizationContainerComponent,
    ],
    imports: [
        ButtonModule,
        CommonModule,
        LpPersonalizationModule,
    ],
    exports: [
        LpPersonalizationContainerComponent,
    ],
})
export class LpPersonalizationContainerModule { }
