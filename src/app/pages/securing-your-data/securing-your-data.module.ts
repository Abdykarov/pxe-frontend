import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SecuringYourDataComponent } from './securing-your-data.component';
import { SecuringYourDataRoutingModule } from './securing-your-data-routing.module';

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
