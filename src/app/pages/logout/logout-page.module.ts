import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// own classes
import { AlertModule } from 'src/common/ui/alert/alert.module';
import { LogoutPageComponent } from './logout-page.component';
import { LogoutPageRoutingModule } from './logout-page.routing';
import { PlaceloaderModule } from 'src/common/ui/placeloader/placeloader.module';

@NgModule({
    declarations: [
        LogoutPageComponent,
    ],
    exports: [
        LogoutPageComponent,
    ],
    imports: [
        AlertModule,
        CommonModule,
        LogoutPageRoutingModule,
        PlaceloaderModule,
    ],
})
export class LogoutPageModule {}
