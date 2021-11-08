import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
// own classes
import { AlertModule } from 'src/common/ui/alert/alert.module';
import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';
import { LogoutPageComponent } from './logout-page.component';
import { LogoutPageRoutingModule } from './logout-page.routing';

@NgModule({
    declarations: [LogoutPageComponent],
    exports: [LogoutPageComponent],
    imports: [
        AlertModule,
        CommonModule,
        LayoutContainerModule,
        LogoutPageRoutingModule,
        PlaceloaderModule,
    ],
})
export class LogoutPageModule {}
