import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertModule } from 'src/common/ui/alert/alert.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { InfoBannerModule } from 'src/common/ui/info-banner/info-banner.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { PaginationModule } from 'src/common/ui/pagination/pagination.module';
import { PipesModule } from 'src/common/pipes/pipes.module';
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
        LayoutContainerModule,
        PaginationModule,
        PipesModule,
        PlaceloaderModule,
        SupplierConcludedContractsRoutingModule,
        TableModule,
    ],
})
export class SupplierConcludedContractsModule {}
