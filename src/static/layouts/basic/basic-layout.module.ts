import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { DirectivesModule } from 'src/common/directives/directives.module';
import { PipesModule } from 'src/common/pipes/common/pipes.module';
import { SecuredPipesModule } from 'src/common/pipes/secured/secured-pipes.module';
import { FooterModule } from 'src/common/ui/footer/footer.module';
import { HeaderModule } from 'src/common/ui/header/header.module';
import { NavigationModule } from 'src/common/ui/navigation/navigation.module';
import { BasicLayoutComponent } from './basic-layout.component';
import { BasicLayoutRoutingModule } from './basic-layout.routing';

@NgModule({
    declarations: [BasicLayoutComponent],
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
