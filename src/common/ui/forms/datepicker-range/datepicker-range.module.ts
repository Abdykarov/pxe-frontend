import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { DatepickerRangeComponent } from './datepicker-range.component';
import { DirectivesModule } from 'src/common/directives/directives.module';
import { PipesModule } from 'src/common/pipes/common/pipes.module';

@NgModule({
    declarations: [
        DatepickerRangeComponent,
    ],
    imports: [
        BsDatepickerModule.forRoot(),
        CommonModule,
        DirectivesModule,
        PipesModule,
        ReactiveFormsModule,
    ],
    exports: [
        DatepickerRangeComponent,
    ],
})
export class DatepickerRangeModule {}
