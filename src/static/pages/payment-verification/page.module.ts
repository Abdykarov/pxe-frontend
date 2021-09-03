import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { ButtonModule } from 'src/common/ui/button/button.module';
import { InfoBannerModule } from 'src/common/ui/info-banner/info-banner.module';
import { PaymentVerificationPageComponent } from './page';
import { ProgressBarModule } from 'src/common/ui/progress-bar/progress-bar.module';
import { TableModule } from 'src/common/ui/table/table.module';

@NgModule({
    declarations: [
        PaymentVerificationPageComponent,
    ],
    exports: [
        PaymentVerificationPageComponent,
    ],
    imports: [
        ButtonModule,
        CommonModule,
        InfoBannerModule,
        ProgressBarModule,
        TableModule,
    ],
})
export class PaymentVerificationPageModule {}

export const paymentVerificationPageRoutes: Routes = [
    {
        path: 'payment-verification',
        component: PaymentVerificationPageComponent,
        data: {
            isPublic: false,
        },
    },
];
