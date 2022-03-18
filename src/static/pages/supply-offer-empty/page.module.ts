import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginType, SignType } from 'src/app/layouts/models/router-data.model';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { InfoBannerModule } from 'src/common/ui/info-banner/info-banner.module';
import { SupplyOfferEmptyComponent } from './page';

@NgModule({
    declarations: [SupplyOfferEmptyComponent],
    exports: [SupplyOfferEmptyComponent],
    imports: [
        BreadcrumbModule,
        ButtonModule,
        CommonModule,
        InfoBannerModule,
        FormModule,
    ],
})
export class SupplyOfferEmptyPageModule {}

export const supplyOfferEmptyPageRoutes: Routes = [
    {
        path: 'supply-offer-empty',
        component: SupplyOfferEmptyComponent,
        data: {
            isPublic: false,
            loginType: LoginType.NONE,
            signUpType: SignType.NONE,
        },
    },
];
