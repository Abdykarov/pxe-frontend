import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// own components
import { BreadcrumbComponent } from './breadcrumb.component';

// own modules
import { DropdownModule } from '../dropdown/dropdown.module';

@NgModule({
    declarations: [
        BreadcrumbComponent,
    ],
    imports: [
        CommonModule,
        DropdownModule,
        RouterModule,
    ],
    exports: [
        BreadcrumbComponent,
    ],
})
export class BreadcrumbModule {}
