import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TermsOfUseComponent } from './terms-of-use.component';
import { TermsOfUseRoutingModule } from './terms-of-use.routing';

@NgModule({
    declarations: [
        TermsOfUseComponent,
    ],
    imports: [
        CommonModule,
        TermsOfUseRoutingModule,
    ],
})
export class TermsOfUseModule {}
