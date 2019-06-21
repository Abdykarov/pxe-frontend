import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BannerUIModule } from 'src/common/ui/banner/banner-ui.module';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { LayoutContainerComponent } from './layout-container.component';

@NgModule({
    declarations: [
        LayoutContainerComponent,
    ],
    imports: [
        BannerUIModule,
        BreadcrumbModule,
        CommonModule,
    ],
    exports: [
        LayoutContainerComponent,
    ],
})
export class LayoutContainerModule { }
