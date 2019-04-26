import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { TermsOfUseComponent } from './terms-of-use.component';
import { TermsOfUseRoutingModule } from './terms-of-use.routing';

@NgModule({
    declarations: [
        TermsOfUseComponent,
    ],
    imports: [
        CommonModule,
        LayoutContainerModule,
        TermsOfUseRoutingModule,
    ],
})
export class TermsOfUseModule {}
