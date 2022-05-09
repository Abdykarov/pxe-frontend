import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
// own classes
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { FooterModule } from 'src/common/ui/footer/footer.module';
import { HeaderModule } from 'src/common/ui/header/header.module';
import { NotFoundComponent } from './not-found.component';
import { NotFoundRoutingModule } from './not-found.routing';

@NgModule({
    declarations: [NotFoundComponent],
    exports: [NotFoundComponent],
    imports: [
        BreadcrumbModule,
        CommonModule,
        FooterModule,
        HeaderModule,
        LayoutContainerModule,
        NotFoundRoutingModule,
    ],
})
export class NotFoundModule {}
