import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FooterLayoutModule } from 'src/common/containers/footer-layout/footer-layout.module';
import { SecuringYourDataComponent } from './securing-your-data.component';
import { SecuringYourDataRoutingModule } from './securing-your-data.routing';

@NgModule({
    declarations: [
        SecuringYourDataComponent,
    ],
    imports: [
        CommonModule,
        FooterLayoutModule,
        SecuringYourDataRoutingModule,
    ],
})
export class SecuringYourDataModule {}
