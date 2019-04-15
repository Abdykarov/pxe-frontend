import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CookiesPolicyComponent } from './cookies-policy.component';
import { CookiesPolicyRoutingModule } from './cookies-policy.routing';
import { FooterLayoutModule } from 'src/common/containers/footer-layout/footer-layout.module';

@NgModule({
    declarations: [
        CookiesPolicyComponent,
    ],
    imports: [
        CommonModule,
        CookiesPolicyRoutingModule,
        FooterLayoutModule,
    ],
})
export class CookiesPolicyModule {}
