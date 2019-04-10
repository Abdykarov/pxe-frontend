import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PragueExchangeRoutingModule } from './prague-exchange-routing.module';
import { PragueExchangeComponent } from './prague-exchange.component';

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
