import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AddressNotFoundModule } from 'src/common/containers/address-whisperer/address-not-found/address-not-found.module';
import { SelectModule } from 'src/common/ui/forms/select/select.module';
import { AddressWhispererComponent } from './address-whisperer.component';

@NgModule({
    declarations: [AddressWhispererComponent],
    exports: [AddressWhispererComponent],
    imports: [AddressNotFoundModule, CommonModule, SelectModule],
})
export class AddressWhispererModule {}
