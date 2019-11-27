import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';

import { ButtonModule } from 'src/common/ui/button/button.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { ContractSigningPageComponent } from './page';
import { ProgressBarModule } from 'src/common/ui/progress-bar/progress-bar.module';
import { SupplyPointOfferModule } from 'src/common/ui/supply-point-offer/supply-point-offer.module';

@NgModule({
    declarations: [
        ContractSigningPageComponent,
    ],
    exports: [
        ContractSigningPageComponent,
    ],
    imports: [
        ButtonModule,
        CommonModule,
        FormModule,
        PdfJsViewerModule,
        ProgressBarModule,
        SupplyPointOfferModule,
    ],
})
export class ContractSigningPageModule {}

export const contractSigningPageRoutes: Routes = [
    {
        path: 'contract-signing',
        component: ContractSigningPageComponent,
    },
];
