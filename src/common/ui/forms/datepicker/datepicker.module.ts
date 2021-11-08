import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DirectivesModule } from 'src/common/directives/directives.module';
import { PipesModule } from 'src/common/pipes/common/pipes.module';
import { DatepickerComponent } from './datepicker.component';

@NgModule({
    declarations: [DatepickerComponent],
    imports: [
        BsDatepickerModule.forRoot(),
        CommonModule,
        DirectivesModule,
        PipesModule,
        ReactiveFormsModule,
    ],
    exports: [DatepickerComponent],
})
export class DatepickerModule {}
