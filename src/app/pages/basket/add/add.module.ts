import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRoutingModule } from './add-routing.module';
import { AddComponent } from './add.component';

@NgModule({
    declarations: [AddComponent],
    imports: [
        AddRoutingModule,
        CommonModule,
    ],
})
export class AddModule { }
