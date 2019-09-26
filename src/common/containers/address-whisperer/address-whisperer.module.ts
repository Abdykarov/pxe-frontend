import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AddressWhispererComponent } from './address-whisperer.component';
import { AddressNotFoundModule } from 'src/common/containers/address-whisperer/address-not-found/address-not-found.module';
import { SelectModule } from 'src/common/ui/forms/select/select.module';

@NgModule({
    declarations: [
        AddressWhispererComponent,
    ],
    exports: [
        AddressWhispererComponent,
    ],
    imports: [
        AddressNotFoundModule,
        CommonModule,
        SelectModule,
    ],
})
export class AddressWhispererModule { }
