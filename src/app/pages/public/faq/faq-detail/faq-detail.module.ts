import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { PipesModule } from 'src/common/pipes/common/pipes.module';
import { AccordionModule } from 'src/common/ui/accordion/accordion.module';
import { BadgeModule } from 'src/common/ui/badge/badge.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { FaqDetailRoutingModule } from './faq-detail-routing.module';
import { FaqDetailComponent } from './faq-detail.component';

@NgModule({
    declarations: [FaqDetailComponent],
    imports: [
        AccordionModule,
        BadgeModule,
        ButtonModule,
        CommonModule,
        FaqDetailRoutingModule,
        LayoutContainerModule,
        PipesModule,
    ],
})
export class FaqDetailModule {}
