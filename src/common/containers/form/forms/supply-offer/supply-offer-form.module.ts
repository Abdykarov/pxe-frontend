import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddressWhispererModule } from 'src/common/containers/address-whisperer/address-whisperer.module';
import { PipesModule } from 'src/common/pipes/common/pipes.module';
import { AlertModule } from 'src/common/ui/alert/alert.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { DatepickerRangeModule } from 'src/common/ui/forms/datepicker-range/datepicker-range.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { SelectModule } from 'src/common/ui/forms/select/select.module';
import { SupplyOfferFormComponent } from './supply-offer-form.component';

@NgModule({
    declarations: [SupplyOfferFormComponent],
    imports: [
        AddressWhispererModule,
        AlertModule,
        ButtonModule,
        CommonModule,
        DatepickerRangeModule,
        FormModule,
        FormsModule,
        PipesModule,
        ReactiveFormsModule,
        SelectModule,
    ],
    exports: [SupplyOfferFormComponent],
})
export class SupplyOfferFormModule {}
