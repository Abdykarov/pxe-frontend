import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BannerUIModule } from 'src/common/ui/banner/banner-ui.module';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { LogoutInformationModule } from 'src/common/ui/logout-informationation/logout-information.module';
import { LayoutContainerComponent } from './layout-container.component';

@NgModule({
    declarations: [LayoutContainerComponent],
    exports: [LayoutContainerComponent],
    imports: [
        BannerUIModule,
        BreadcrumbModule,
        CommonModule,
        LogoutInformationModule,
    ],
})
export class LayoutContainerModule {}
