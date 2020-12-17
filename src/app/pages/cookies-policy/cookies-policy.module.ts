import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AskForOfferConteinerModule } from 'src/common/containers/form/forms/ask-for-offer/ask-for-offer-conteiner.module';
import { CookiesPolicyComponent } from './cookies-policy.component';
import { CookiesPolicyRoutingModule } from './cookies-policy.routing';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';

@NgModule({
    declarations: [
        CookiesPolicyComponent,
    ],
    imports: [
        AskForOfferConteinerModule,
        CommonModule,
        CookiesPolicyRoutingModule,
        LayoutContainerModule,
    ],
})
export class CookiesPolicyModule {}
