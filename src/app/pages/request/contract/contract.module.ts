import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractComponent } from './contract.component';
import { ContractRoutingModule } from './contract-routing.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';

@NgModule({
    declarations: [
        ContractComponent,
    ],
    exports: [
        ContractComponent,
    ],
    imports: [
        CommonModule,
        ContractRoutingModule,
        LayoutContainerModule,
    ],
})
export class ContractModule {}
