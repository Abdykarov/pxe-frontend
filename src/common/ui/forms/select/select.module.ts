import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';

import { SelectComponent } from './select.component';

@NgModule({
    declarations: [
        SelectComponent,
    ],
    imports: [
        CommonModule,
        NgSelectModule,
        ReactiveFormsModule,
    ],
    exports: [
        SelectComponent,
    ],
})
export class SelectModule {}
