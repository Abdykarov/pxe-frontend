import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// own classes
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { ErrorPage404Module } from 'src/common/ui/error-page-404/error-page-404.module';
import { NotFoundComponent } from './not-found.component';
import { NotFoundRoutingModule } from './not-found.routing';

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
        ErrorPage404Module,
        NotFoundRoutingModule,
    ],
})
export class NotFoundModule {}
