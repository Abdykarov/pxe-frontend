import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PragueExchangeComponent } from './prague-exchange.component';
import { PragueExchangeRoutingModule } from './prague-exchange.routing';

@NgModule({
    declarations: [
        PragueExchangeComponent,
    ],
    imports: [
        CommonModule,
        PragueExchangeRoutingModule,
    ],
})
export class PragueExchangeModule {}
