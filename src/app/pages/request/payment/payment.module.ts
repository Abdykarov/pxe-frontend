import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertModule } from 'src/common/ui/alert/alert.module';
import { PaymentComponent } from './payment.component';
import { PaymentRoutingModule } from './payment-routing.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { ProgressBarModule } from 'src/common/ui/progress-bar/progress-bar.module';

@NgModule({
    declarations: [
        PaymentComponent,
    ],
    exports: [
        PaymentComponent,
    ],
    imports: [
        AlertModule,
        CommonModule,
        PaymentRoutingModule,
        LayoutContainerModule,
        ProgressBarModule,
    ],
})
export class PaymentModule {}
