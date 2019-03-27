import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// own classes
import { SecuredLayoutComponent } from './secured-layout.component';

// own modules
import { FooterModule } from 'src/common/ui/footer/footer.module';
import { HeaderModule } from 'src/common/ui/header/header.module';
import { NavigationModule } from 'src/common/ui/navigation/navigation.module';
import { SecuredLayoutRoutingModule } from './secured-layout.routing';

// own services
import { NavigationService } from './services/navigation.service';

@NgModule({
    declarations: [
        SecuredLayoutComponent,
    ],
    imports: [
        CommonModule,
        FooterModule,
        HeaderModule,
        NavigationModule,
        SecuredLayoutRoutingModule,
    ],
    providers: [
        NavigationService,
    ],
})
export class SecuredLayoutModule { }
