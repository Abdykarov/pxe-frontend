import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertModule } from 'src/common/ui/alert/alert.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { InfoBannerModule } from 'src/common/ui/info-banner/info-banner.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { LoaderModule } from 'src/common/ui/loader/loader.module';
import { PaginationModule } from 'src/common/ui/pagination/pagination.module';
import { PipesModule } from 'src/common/pipes/pipes.module';
import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';
import { ConcludedContractsRoutingModule } from './concluded-contracts-routing.module';
import { ConcludedContractsComponent } from './concluded-contracts.component';
import { TableModule } from 'src/common/ui/table/table.module';

@NgModule({
    declarations: [
        ConcludedContractsComponent,
    ],
    imports: [
        AlertModule,
        ButtonModule,
        CommonModule,
        InfoBannerModule,
        LayoutContainerModule,
        LoaderModule,
        PaginationModule,
        PipesModule,
        PlaceloaderModule,
        ConcludedContractsRoutingModule,
        TableModule,
    ],
})
export class ConcludedContractsModule {}
