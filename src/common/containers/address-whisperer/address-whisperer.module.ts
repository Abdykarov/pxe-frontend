import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AddressWhispererComponent } from './address-whisperer.component';
import {
    AddressWhispererByHandFormModule,
} from 'src/common/containers/form/forms/address-whisperer-by-hand/address-whisperer-by-hand-form.module';
import { SelectModule } from 'src/common/ui/forms/select/select.module';

@NgModule({
    declarations: [
        AddressWhispererComponent,
    ],
    exports: [
        AddressWhispererComponent,
    ],
    imports: [
        AddressWhispererByHandFormModule,
        CommonModule,
        SelectModule,
    ],
})
export class AddressWhispererModule { }
