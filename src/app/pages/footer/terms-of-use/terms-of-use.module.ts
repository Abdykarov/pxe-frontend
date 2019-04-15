import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FooterLayoutModule } from 'src/common/containers/footer-layout/footer-layout.module';
import { TermsOfUseComponent } from './terms-of-use.component';
import { TermsOfUseRoutingModule } from './terms-of-use.routing';

@NgModule({
    declarations: [
        TermsOfUseComponent,
    ],
    imports: [
        CommonModule,
        FooterLayoutModule,
        TermsOfUseRoutingModule,
    ],
})
export class TermsOfUseModule {}
