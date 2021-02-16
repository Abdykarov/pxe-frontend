import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeletedAccountComponent } from './deleted-account.component';
import { DeletedAccountRoutingModule } from 'src/app/pages/public/deleted-account/deleted-account.routing';
import { InfoBannerModule } from 'src/common/ui/info-banner/info-banner.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';

@NgModule({
    declarations: [
        DeletedAccountComponent,
    ],
    exports: [
        DeletedAccountComponent,
    ],
    imports: [
        CommonModule,
        InfoBannerModule,
        LayoutContainerModule,
        DeletedAccountRoutingModule,
    ],
})
export class DeletedAccountModule {}
