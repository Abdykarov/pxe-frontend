import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaginationModule as BoostrapPaginationModule } from 'ngx-bootstrap';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { PaginationComponent } from './pagination.component';

@NgModule({
    declarations: [PaginationComponent],
    imports: [
        BoostrapPaginationModule.forRoot(),
        ButtonModule,
        CommonModule,
        FormModule,
    ],
    exports: [PaginationComponent],
})
export class PaginationModule {}
