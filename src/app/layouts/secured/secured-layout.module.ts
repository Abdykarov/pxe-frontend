import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FooterModule } from 'src/common/ui/footer/footer.module';
import { DirectivesModule } from 'src/common/directives/directives.module';
import { HeaderModule } from 'src/common/ui/header/header.module';
import { NavigationModule } from 'src/common/ui/navigation/navigation.module';
import { NavigationService } from './services/navigation.service';
import { ModalModule } from 'src/common/containers/modal/modal.module';
import { SecuredLayoutComponent } from './secured-layout.component';
import { SecuredLayoutRoutingModule } from './secured-layout.routing';

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
    ],
})
export class SecuredLayoutModule { }
