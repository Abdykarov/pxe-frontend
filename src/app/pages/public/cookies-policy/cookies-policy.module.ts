import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AskForOfferContainerModule } from 'src/common/containers/form/forms/ask-for-offer/ask-for-offer-container.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { CookiesPolicyComponent } from './cookies-policy.component';
import { CookiesPolicyRoutingModule } from './cookies-policy.routing';

@NgModule({
    declarations: [CookiesPolicyComponent],
    imports: [
        AskForOfferContainerModule,
        CommonModule,
        CookiesPolicyRoutingModule,
        LayoutContainerModule,
    ],
})
export class CookiesPolicyModule {}
