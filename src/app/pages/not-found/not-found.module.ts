import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// own classes
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { NotFoundComponent } from './not-found.component';
import { NotFoundRoutingModule } from './not-found.routing';
import { InfoBannerModule } from 'src/common/ui/info-banner/info-banner.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';

@NgModule({
    declarations: [
        NotFoundComponent,
    ],
    exports: [
        NotFoundComponent,
    ],
    imports: [
        BreadcrumbModule,
        CommonModule,
        InfoBannerModule,
        LayoutContainerModule,
        NotFoundRoutingModule,
    ],
})
export class NotFoundModule {}
