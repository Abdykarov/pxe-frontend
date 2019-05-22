import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { SupplyOfferComponent } from './page';
import { TableModule } from 'src/common/ui/table/table.module';
import { DropdownModule } from 'src/common/ui/dropdown/dropdown.module';
import { ButtonModule } from 'src/common/ui/button/button.module';

@NgModule({
    declarations: [
        SupplyOfferComponent,
    ],
    exports: [
        SupplyOfferComponent,
    ],
    imports: [
        BreadcrumbModule,
        ButtonModule,
        DropdownModule,
        CommonModule,
        TableModule,
    ],
})
export class SupplyOfferPageModule {}

export const supplyOfferPageRoutes: Routes = [
    {
        path: 'supply-offer',
        component: SupplyOfferComponent,
    },
];
