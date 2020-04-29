import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { PipesModule } from 'src/common/pipes/pipes.module';

import { FaqDetailRoutingModule } from './faq-detail-routing.module';
import { FaqDetailComponent } from './faq-detail.component';

@NgModule({
    declarations: [
        FaqDetailComponent,
    ],
    imports: [
        CommonModule,
        FaqDetailRoutingModule,
        LayoutContainerModule,
        PipesModule,
    ],
})
export class FaqDetailModule { }
