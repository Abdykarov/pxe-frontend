import { NgModule } from '@angular/core';
import { OAuthLayoutComponent } from './o-auth-layout.component';
import { OAuthRoutingLayoutModule } from './o-auth-layout.routing';

@NgModule({
    declarations: [OAuthLayoutComponent],
    imports: [OAuthRoutingLayoutModule],
})
export class OAuthLayoutModule {}
