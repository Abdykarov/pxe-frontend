import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { InfoBannerModule } from 'src/common/ui/info-banner/info-banner.module';
import {
    LoginType,
    SignType,
} from 'src/app/layouts/models/router-data.model';
import { SupplierConcludedContractsEmptyComponent } from './page';

@NgModule({
    declarations: [
        SupplierConcludedContractsEmptyComponent,
    ],
    exports: [
        SupplierConcludedContractsEmptyComponent,
    ],
    imports: [
        CommonModule,
        InfoBannerModule,
    ],
})
export class SupplierConcludedContractsEmptyModule {}

export const supplierConcludedContractsEmptyRoutes: Routes = [
    {
        path: 'supplier-concluded-contract-empty',
        component: SupplierConcludedContractsEmptyComponent,
        data: {
            isSimpleFooter: false,
            isPublic: false,
            isSupplier: true,
            loginType: LoginType.NONE,
            signUpType: SignType.NONE,
            hideLeftNavigation: true,
        },
    },
];
