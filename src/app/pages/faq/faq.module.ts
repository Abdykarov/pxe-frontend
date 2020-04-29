import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FaqComponent } from 'src/app/pages/faq/faq.component';
import { FaqRoutingModule } from 'src/app/pages/faq/faq-routing.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';

@NgModule({
    declarations: [
        FaqComponent,
    ],
    exports: [
        FaqComponent,
    ],
    imports: [
        CommonModule,
        LayoutContainerModule,
        FaqRoutingModule,
    ],
})
export class FaqModule { }
