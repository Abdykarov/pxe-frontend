import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecuringYourDataRoutingModule } from './securing-your-data-routing.module';
import { SecuringYourDataComponent } from './securing-your-data.component';

@NgModule({
    declarations: [
        SecuringYourDataComponent,
    ],
    imports: [
        CommonModule,
        SecuringYourDataRoutingModule,
    ],
})
export class SecuringYourDataModule {}
