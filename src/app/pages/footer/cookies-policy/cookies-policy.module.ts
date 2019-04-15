import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CookiesPolicyComponent } from './cookies-policy.component';
import { CookiesPolicyRoutingModule } from './cookies-policy.routing';
import {
    NotificationLayoutContainerModule,
} from 'src/common/containers/notification-layout-container/notification-layout-container.module';

@NgModule({
    declarations: [
        CookiesPolicyComponent,
    ],
    imports: [
        CommonModule,
        CookiesPolicyRoutingModule,
        NotificationLayoutContainerModule,
    ],
})
export class CookiesPolicyModule {}
