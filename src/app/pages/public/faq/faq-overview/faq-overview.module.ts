import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PipesModule } from 'src/common/pipes/common/pipes.module';
import { AccordionModule } from 'src/common/ui/accordion/accordion.module';
import { FaqOverviewRoutingModule } from './faq-overview-routing.module';
import { FaqOverviewComponent } from './faq-overview.component';

@NgModule({
    declarations: [FaqOverviewComponent],
    imports: [
        AccordionModule,
        CommonModule,
        FaqOverviewRoutingModule,
        PipesModule,
    ],
})
export class FaqOverviewModule {}
