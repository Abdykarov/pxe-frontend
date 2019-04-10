import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { TermOfUseComponent } from './term-of-use.component';
import { TermOfUseRoutingModule } from './term-of-use-routing.module';

@NgModule({
    declarations: [
        TermOfUseComponent,
    ],
    imports: [
        CommonModule,
        TermOfUseRoutingModule,
    ],
})
export class TermOfUseModule {}
