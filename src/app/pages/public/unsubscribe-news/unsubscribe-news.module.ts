import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BannerUIModule } from 'src/common/ui/banner/banner-ui.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';
import { UnsubscribeNewsComponent } from './unsubscribe-news.component';
import { UnsubscribeRoutingModule } from './unsubcribe-news.routing';
import {AlertModule} from '../../../../common/ui/alert/alert.module';

@NgModule({
    declarations: [
        UnsubscribeNewsComponent,
    ],
    imports: [
        CommonModule,
        UnsubscribeRoutingModule,
        LayoutContainerModule,
        PlaceloaderModule,
        BannerUIModule,
        AlertModule,
    ],
})
export class UnsubscribeNewsModule {}
