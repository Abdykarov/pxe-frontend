import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { LayoutContainerComponent } from './layout-container.component';
import { BannerUIModule } from 'src/common/ui/banner/banner-ui.module';

@NgModule({
    declarations: [
        LayoutContainerComponent,
    ],
    imports: [
        BreadcrumbModule,
        BannerUIModule,
        CommonModule,
    ],
    exports: [
        LayoutContainerComponent,
    ],
})
export class LayoutContainerModule { }
