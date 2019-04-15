import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CookiesPolicyComponent } from './cookies-policy.component';
import { CookiesPolicyRoutingModule } from './cookies-policy.routing';

@NgModule({
    declarations: [
        CookiesPolicyComponent,
    ],
    imports: [
        CommonModule,
        CookiesPolicyRoutingModule,
    ],
})
export class CookiesPolicyModule {}
