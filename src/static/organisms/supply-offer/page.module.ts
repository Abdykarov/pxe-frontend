import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { DropdownModule } from 'src/common/ui/dropdown/dropdown.module';
import { SupplyOfferComponent } from './page';
import { TableModule } from 'src/common/ui/table/table.module';
import { TooltipModule } from 'src/common/ui/tooltip/tooltip.module';
import { DatepickerModule } from '../../../common/ui/forms/datepicker/datepicker.module';
import { FormModule } from '../../../common/ui/forms/form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from '../../../common/ui/forms/select/select.module';

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
        DatepickerModule,
        DropdownModule,
        FormModule,
        CommonModule,
        TableModule,
        TooltipModule,
        ReactiveFormsModule,
        SelectModule,
    ],
})
export class SupplyOfferPageModule {}

export const supplyOfferPageRoutes: Routes = [
    {
        path: 'supply-offer',
        component: SupplyOfferComponent,
    },
];
