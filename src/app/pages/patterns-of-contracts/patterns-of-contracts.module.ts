import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AlertModule } from 'src/common/ui/alert/alert.module';
import { BannerUIModule } from 'src/common/ui/banner/banner-ui.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { InfoBannerModule } from 'src/common/ui/info-banner/info-banner.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { PatternsOfContractsComponent } from 'src/app/pages/patterns-of-contracts/patterns-of-contracts.component';
import { PatternsOfContractsRoutingModule } from 'src/app/pages/patterns-of-contracts/patterns-of-contracts-routing.module';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { PipesModule } from 'src/common/pipes/pipes.module';
import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';


@NgModule({
    declarations: [
        PatternsOfContractsComponent,
    ],
    exports: [
        PatternsOfContractsComponent,
    ],
    imports: [
        AlertModule,
        BannerUIModule,
        ButtonModule,
        CommonModule,
        InfoBannerModule,
        LayoutContainerModule,
        PdfJsViewerModule,
        PipesModule,
        PlaceloaderModule,
        PatternsOfContractsRoutingModule,
    ],
})
export class PatternsOfContractsModule { }
