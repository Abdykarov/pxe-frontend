import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DirectivesModule } from 'src/common/directives/directives.module';
import { FooterModule } from 'src/common/ui/footer/footer.module';
import { HeaderModule } from 'src/common/ui/header/header.module';
import { NavigationModule } from 'src/common/ui/navigation/navigation.module';
import { NavigationService } from './services/navigation.service';
import { ModalModule } from 'src/common/containers/modal/modal.module';
import { SecuredLayoutComponent } from './secured-layout.component';
import { SecuredLayoutRoutingModule } from './secured-layout.routing';
import { RefreshTokenResolver } from 'src/app/resolvers/refresh-token.resolver';

@NgModule({
    declarations: [
        SecuredLayoutComponent,
    ],
    imports: [
        CommonModule,
        DirectivesModule,
        FooterModule,
        HeaderModule,
        ModalModule,
        NavigationModule,
        SecuredLayoutRoutingModule,
    ],
    providers: [
        NavigationService,
        RefreshTokenResolver,
    ],
})
export class SecuredLayoutModule { }
