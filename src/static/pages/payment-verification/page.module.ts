import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { InfoBannerModule } from 'src/common/ui/info-banner/info-banner.module';
import { PaymentVerificationPageComponent } from './page';
import { ProgressBarModule } from 'src/common/ui/progress-bar/progress-bar.module';

@NgModule({
    declarations: [
        PaymentVerificationPageComponent,
    ],
    exports: [
        PaymentVerificationPageComponent,
    ],
    imports: [
        CommonModule,
        InfoBannerModule,
        ProgressBarModule,
    ],
})
export class PaymentVerificationPageModule {}

export const paymentVerificationPageRoutes: Routes = [
    {
        path: 'payment-verification',
        component: PaymentVerificationPageComponent,
    },
];
