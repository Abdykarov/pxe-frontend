import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CookiesPolicyComponent } from './cookies-policy.component';
import { CookiesPolicyRoutingModule } from './cookies-policy.routing';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';

@NgModule({
    declarations: [
        CookiesPolicyComponent,
    ],
    imports: [
        CommonModule,
        CookiesPolicyRoutingModule,
        LayoutContainerModule,
    ],
})
export class CookiesPolicyModule {}
