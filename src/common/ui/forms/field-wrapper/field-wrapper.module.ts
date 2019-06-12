import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PipesModule } from 'src/common/pipes/pipes.module';
import { FieldWrapperComponent } from './field-wrapper.component';

@NgModule({
    declarations: [
        FieldWrapperComponent,
    ],
    exports: [
        FieldWrapperComponent,
    ],
    imports: [
        CommonModule,
        PipesModule,
        RouterModule,
    ],
})
export class FieldWrapperModule {}
