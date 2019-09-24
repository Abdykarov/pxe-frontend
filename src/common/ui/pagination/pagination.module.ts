import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PaginationModule } from 'ngx-bootstrap';

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
        PaginationModule,
    ],
    exports: [
        PaginationComponent,
    ],
})
export class PaginationNgxModule {}
