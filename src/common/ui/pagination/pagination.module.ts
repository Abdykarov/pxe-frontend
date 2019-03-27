import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from 'src/common/ui/button/button.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { PaginationComponent } from './pagination.component';

@NgModule({
    declarations: [
        PaginationComponent,
    ],
    imports: [
        ButtonModule,
        CommonModule,
        FormModule,
    ],
    exports: [
        PaginationComponent,
    ],
})
export class PaginationModule {}
