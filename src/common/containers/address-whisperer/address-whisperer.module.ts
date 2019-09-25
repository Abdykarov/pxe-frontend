import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AddressWhispererComponent } from './address-whisperer.component';
import {
    AddressWhispererBySelfFormModule,
} from 'src/common/ui/address-whisperer-by-self/address-whisperer-by-self-form.module';
import { SelectModule } from 'src/common/ui/forms/select/select.module';

@NgModule({
    declarations: [
        AddressWhispererComponent,
    ],
    exports: [
        AddressWhispererComponent,
    ],
    imports: [
        AddressWhispererBySelfFormModule,
        CommonModule,
        SelectModule,
    ],
})
export class AddressWhispererModule { }
