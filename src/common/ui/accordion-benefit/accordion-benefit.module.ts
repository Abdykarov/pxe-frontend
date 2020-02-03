import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AccordionBenefitComponent } from './accordion-benefit.component';

@NgModule({
    declarations: [
        AccordionBenefitComponent,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        AccordionBenefitComponent,
    ],
})
export class AccordionBenefitModule {}
