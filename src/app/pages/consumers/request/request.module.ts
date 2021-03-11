import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RefreshTokenResolver } from 'src/app/resolvers/refresh-token.resolver';
import { RequestRoutingModule } from './request.routing';
import { RequestComponent } from './request.component';

@NgModule({
    declarations: [
        RequestComponent,
    ],
    imports: [
        CommonModule,
        RequestRoutingModule,
    ],
    providers: [
        RefreshTokenResolver,
    ],
})
export class RequestModule {}
