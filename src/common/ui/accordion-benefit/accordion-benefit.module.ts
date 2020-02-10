import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AccordionBenefitComponent } from './accordion-benefit.component';
import { ButtonModule } from '../button/button.module';

@NgModule({
    declarations: [
        AccordionBenefitComponent,
    ],
    imports: [
        ButtonModule,
        CommonModule,
    ],
    exports: [
        AccordionBenefitComponent,
    ],
})
export class AccordionBenefitModule {}
