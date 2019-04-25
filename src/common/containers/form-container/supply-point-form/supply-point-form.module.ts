import { CommonModule } from '@angular/common';
import {
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { NgModule } from '@angular/core';

import { AlertModule } from 'src/common/ui/alert/alert.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { SupplyPointFormComponent } from './supply-point-form.component';

@NgModule({
    declarations: [
        SupplyPointFormComponent,
    ],
    imports: [
        AlertModule,
        ButtonModule,
        CommonModule,
        FormModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        SupplyPointFormComponent,
    ],
})
export class SupplyPointFormModule {}
