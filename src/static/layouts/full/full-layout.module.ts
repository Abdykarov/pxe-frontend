import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FullLayoutComponent } from './full-layout.component';
import { FullLayoutRoutingModule } from './full-layout.routing';

@NgModule({
    declarations: [
        FullLayoutComponent,
    ],
    imports: [
        CommonModule,
        FullLayoutRoutingModule,
        HttpClientModule,
    ],
})
export class FullLayoutModule {}
