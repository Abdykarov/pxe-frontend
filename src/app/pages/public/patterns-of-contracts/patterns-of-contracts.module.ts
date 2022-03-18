import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PatternsOfContractsRoutingModule } from 'src/app/pages/public/patterns-of-contracts/patterns-of-contracts-routing.module';
import { PatternsOfContractsComponent } from 'src/app/pages/public/patterns-of-contracts/patterns-of-contracts.component';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { DirectivesModule } from 'src/common/directives/directives.module';
import { PipesModule } from 'src/common/pipes/common/pipes.module';
import { AlertModule } from 'src/common/ui/alert/alert.module';
import { BannerUIModule } from 'src/common/ui/banner/banner-ui.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { InfoBannerModule } from 'src/common/ui/info-banner/info-banner.module';
import { PdfViewerModule } from 'src/common/ui/pdf-viewer/pdf-viewer.module';
import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';
import { TableModule } from 'src/common/ui/table/table.module';

@NgModule({
    declarations: [PatternsOfContractsComponent],
    exports: [PatternsOfContractsComponent],
    imports: [
        AlertModule,
        BannerUIModule,
        ButtonModule,
        CommonModule,
        DirectivesModule,
        InfoBannerModule,
        LayoutContainerModule,
        PdfViewerModule,
        PipesModule,
        PlaceloaderModule,
        PatternsOfContractsRoutingModule,
        TableModule,
    ],
})
export class PatternsOfContractsModule {}
