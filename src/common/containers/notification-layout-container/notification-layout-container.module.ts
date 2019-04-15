import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { NotificationLayoutContainerComponent } from './notification-layout-container.component';

@NgModule({
    declarations: [
        NotificationLayoutContainerComponent,
    ],
    imports: [
        BreadcrumbModule,
        CommonModule,
    ],
    exports: [
        NotificationLayoutContainerComponent,
    ],
})
export class NotificationLayoutContainerModule { }
