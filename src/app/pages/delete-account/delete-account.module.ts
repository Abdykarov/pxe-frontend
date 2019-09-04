import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DeleteAccountComponent } from './delete-account.component';
import { DeleteAccountRoutingModule } from './delete-account-routing.module';

@NgModule({
    declarations: [
        DeleteAccountComponent,
    ],
    imports: [
        CommonModule,
        DeleteAccountRoutingModule,
    ],
})
export class DeleteAccountModule { }
