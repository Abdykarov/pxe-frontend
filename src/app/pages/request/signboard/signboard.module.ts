import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { ButtonModule } from 'src/common/ui/button/button.module';

import { SignboardComponent } from './signboard.component';
import { SignboardRoutingModule } from './signboard-routing.module';

@NgModule({
    declarations: [
        SignboardComponent,
    ],
    imports: [
        CommonModule,
        ButtonModule,
        LayoutContainerModule,
        SignboardRoutingModule,
    ],
})
export class SignboardModule { }
