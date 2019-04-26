import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// own classes
import { SecuredLayoutComponent } from './secured-layout.component';

// own modules
import { FooterModule } from 'src/common/ui/footer/footer.module';
import { HeaderModule } from 'src/common/ui/header/header.module';
import { NavigationModule } from 'src/common/ui/navigation/navigation.module';
import { SecuredLayoutRoutingModule } from './secured-layout.routing';

// own services
import { ModalsModule } from 'src/app/modals/modals.module';
import { NavigationService } from './services/navigation.service';

@NgModule({
    declarations: [
        SecuredLayoutComponent,
    ],
    imports: [
        CommonModule,
        FooterModule,
        HeaderModule,
        ModalsModule,
        NavigationModule,
        SecuredLayoutRoutingModule,
    ],
    providers: [
        NavigationService,
    ],
})
export class SecuredLayoutModule { }
