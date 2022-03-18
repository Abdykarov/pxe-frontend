import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { LoginType, SignType } from 'src/app/layouts/models/router-data.model';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { DropdownModule } from 'src/common/ui/dropdown/dropdown.module';
import { DatepickerRangeModule } from 'src/common/ui/forms/datepicker-range/datepicker-range.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { SelectModule } from 'src/common/ui/forms/select/select.module';
import { TableModule } from 'src/common/ui/table/table.module';
import { TooltipModule } from 'src/common/ui/tooltip/tooltip.module';
import { SupplyOfferComponent } from './page';

@NgModule({
    declarations: [SupplyOfferComponent],
    exports: [SupplyOfferComponent],
    imports: [
        BreadcrumbModule,
        ButtonModule,
        CommonModule,
        DatepickerRangeModule,
        DropdownModule,
        FormModule,
        ReactiveFormsModule,
        SelectModule,
        TableModule,
        TooltipModule,
    ],
})
export class SupplyOfferPageModule {}

export const supplyOfferPageRoutes: Routes = [
    {
        path: 'supply-offer',
        component: SupplyOfferComponent,
        data: {
            isPublic: false,
            loginType: LoginType.NONE,
            signUpType: SignType.NONE,
        },
    },
];
