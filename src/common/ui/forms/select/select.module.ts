import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { NgSelectModule } from '@ng-select/ng-select';

import { FormModule } from 'src/common/ui/forms/form.module';
import { SelectComponent } from './select.component';

@NgModule({
    declarations: [
        SelectComponent,
    ],
    imports: [
        CommonModule,
        FormModule,
        NgOptionHighlightModule,
        NgSelectModule,
        ReactiveFormsModule,
    ],
    exports: [
        SelectComponent,
    ],
})
export class SelectModule {}
