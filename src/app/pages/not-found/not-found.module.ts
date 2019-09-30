import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// own classes
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
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
        NotFoundRoutingModule,
    ],
})
export class NotFoundModule {}
