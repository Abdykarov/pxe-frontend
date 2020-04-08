import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BannerUIModule } from 'src/common/ui/banner/banner-ui.module';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { LayoutContainerComponent } from './layout-container.component';
import { LogoutInInformationModule } from 'src/common/ui/logout-in-informationation/logout-in-information.module';

@NgModule({
    declarations: [
        LayoutContainerComponent,
    ],
    exports: [
        LayoutContainerComponent,
    ],
    imports: [
        BannerUIModule,
        BreadcrumbModule,
        CommonModule,
        LogoutInInformationModule,
    ],
})
export class LayoutContainerModule { }
