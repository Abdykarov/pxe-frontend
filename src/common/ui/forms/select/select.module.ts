import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';

import { FormModule } from 'src/common/ui/forms/form.module';
import { LndOptionHighlightModule } from 'src/third-sides/ng-option-highlight/lnd-option-highlight.module';
import { SelectComponent } from './select.component';

@NgModule({
    declarations: [
        SelectComponent,
    ],
    imports: [
        CommonModule,
        FormModule,
        LndOptionHighlightModule,
        NgSelectModule,
        ReactiveFormsModule,
    ],
    exports: [
        SelectComponent,
    ],
})
export class SelectModule {}
