import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { LayoutContainerComponent } from './layout-container.component';

@NgModule({
    declarations: [
        LayoutContainerComponent,
    ],
    imports: [
        BreadcrumbModule,
        CommonModule,
    ],
    exports: [
        LayoutContainerComponent,
    ],
})
export class LayoutContainerModule { }
