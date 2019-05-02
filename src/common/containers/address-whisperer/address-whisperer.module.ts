import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddressWhispererComponent } from './address-whisperer.component';
import { SelectModule } from 'src/common/ui/forms/select/select.module';

@NgModule({
    declarations: [
        AddressWhispererComponent,
    ],
    exports: [
        AddressWhispererComponent,
    ],
    imports: [
        CommonModule,
        SelectModule,
    ],
})
export class AddressWhispererModule { }
