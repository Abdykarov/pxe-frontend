import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RefreshTokenResolver } from 'src/app/resolvers/refresh-token.resolver';
import { RequestComponent } from './request.component';
import { RequestRoutingModule } from './request.routing';

@NgModule({
    declarations: [RequestComponent],
    imports: [CommonModule, RequestRoutingModule],
    providers: [RefreshTokenResolver],
})
export class RequestModule {}
