import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DeletedAccountRoutingModule } from 'src/app/pages/public/deleted-account/deleted-account.routing';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { InfoBannerModule } from 'src/common/ui/info-banner/info-banner.module';
import { DeletedAccountComponent } from './deleted-account.component';

@NgModule({
    declarations: [DeletedAccountComponent],
    exports: [DeletedAccountComponent],
    imports: [
        CommonModule,
        InfoBannerModule,
        LayoutContainerModule,
        DeletedAccountRoutingModule,
    ],
})
export class DeletedAccountModule {}
