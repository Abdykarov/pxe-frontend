import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PaginationModule } from 'ngx-bootstrap';

import { AlertModule } from 'src/common/ui/alert/alert.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { InfoBannerModule } from 'src/common/ui/info-banner/info-banner.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';
import { SupplierConcludedContractsRoutingModule } from './supplier-concluded-contracts-routing.module';
import { SupplierConcludedContractsComponent } from './supplier-concluded-contracts.component';
import { TableModule } from 'src/common/ui/table/table.module';

@NgModule({
    declarations: [
        SupplierConcludedContractsComponent,
    ],
    imports: [
        AlertModule,
        ButtonModule,
        CommonModule,
        InfoBannerModule,
        PlaceloaderModule,
        LayoutContainerModule,
        PaginationModule,
        SupplierConcludedContractsRoutingModule,
        TableModule,
    ],
})
export class SupplierConcludedContractsModule {}
