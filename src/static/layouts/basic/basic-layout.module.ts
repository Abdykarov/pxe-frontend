import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BasicLayoutComponent } from './basic-layout.component';
import { BasicLayoutRoutingModule } from './basic-layout.routing';
import { DirectivesModule } from 'src/common/directives/directives.module';
import { FooterModule } from 'src/common/ui/footer/footer.module';
import { HeaderModule } from 'src/common/ui/header/header.module';
import { NavigationModule } from 'src/common/ui/navigation/navigation.module';
import { PipesModule } from 'src/common/pipes/common/pipes.module';
import { SecuredPipesModule } from 'src/common/pipes/secured/secured-pipes.module';

@NgModule({
    declarations: [
        BasicLayoutComponent,
    ],
    imports: [
        BasicLayoutRoutingModule,
        CommonModule,
        DirectivesModule,
        FooterModule,
        HeaderModule,
        HttpClientModule,
        NavigationModule,
        PipesModule,
        SecuredPipesModule,
    ],
})
export class BasicLayoutModule {}
