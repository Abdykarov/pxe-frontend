import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DirectivesModule } from 'src/common/directives/directives.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { SelectComponent } from './select.component';

@NgModule({
    declarations: [SelectComponent],
    imports: [
        CommonModule,
        DirectivesModule,
        FormModule,
        NgSelectModule,
        ReactiveFormsModule,
    ],
    exports: [SelectComponent],
})
export class SelectModule {}
