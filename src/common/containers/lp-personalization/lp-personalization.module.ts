import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LpPersonalizationRoutingModule } from './lp-personalization-routing.module';
import { LpPersonalizationComponent } from './lp-personalization.component';


@NgModule({
    declarations: [
        LpPersonalizationComponent,
    ],
    imports: [
        CommonModule,
        LpPersonalizationRoutingModule,
    ],
})
export class LpPersonalizationModule { }
