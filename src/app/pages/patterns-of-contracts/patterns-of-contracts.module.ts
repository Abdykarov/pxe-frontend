import {CommonModule, DatePipe} from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertModule } from 'src/common/ui/alert/alert.module';
import { BannerUIModule } from 'src/common/ui/banner/banner-ui.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { InfoBannerModule } from 'src/common/ui/info-banner/info-banner.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { PatternsOfContractsComponent } from 'src/app/pages/patterns-of-contracts/patterns-of-contracts.component';
import { PatternsOfContractsRoutingModule } from 'src/app/pages/patterns-of-contracts/patterns-of-contracts-routing.module';
import { PdfViewerModule } from 'src/common/ui/pdf-viewer/pdf-viewer.module';
import { PipesModule } from 'src/common/pipes/pipes.module';
import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';
import { TableModule } from 'src/common/ui/table/table.module';

@NgModule({
    declarations: [
        PatternsOfContractsComponent,
    ],
    exports: [
        PatternsOfContractsComponent,
    ],
    providers: [
        DatePipe,
    ],
    imports: [
        AlertModule,
        BannerUIModule,
        ButtonModule,
        CommonModule,
        InfoBannerModule,
        LayoutContainerModule,
        PdfViewerModule,
        PipesModule,
        PlaceloaderModule,
        PatternsOfContractsRoutingModule,
        TableModule,
    ],
})
export class PatternsOfContractsModule { }
