import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { ApolloModule } from 'apollo-angular';

import { HeaderModule } from 'src/common/ui/header/header.module';
import { FullLayoutComponent } from './full-layout.component';
import { FullLayoutRoutingModule } from './full-layout.routing';
import { FooterModule } from 'src/common/ui/footer/footer.module';

@NgModule({
    declarations: [
        FullLayoutComponent,
    ],
    imports: [
        ApolloModule,
        CommonModule,
        HeaderModule,
        FullLayoutRoutingModule,
        FooterModule,
        HttpClientModule,
    ],
})
export class FullLayoutModule {}
