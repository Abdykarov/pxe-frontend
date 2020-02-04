import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ApprovalRoutingModule } from './approval-routing.module';
import { ApprovalComponent } from './approval.component';

@NgModule({
    declarations: [
        ApprovalComponent,
    ],
    imports: [
        CommonModule,
        ApprovalRoutingModule,
    ],
})
export class ApprovalModule { }
