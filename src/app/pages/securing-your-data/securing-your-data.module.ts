import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
    NotificationLayoutContainerModule,
} from 'src/common/containers/notification-layout-container/notification-layout-container.module';
import { SecuringYourDataComponent } from './securing-your-data.component';
import { SecuringYourDataRoutingModule } from './securing-your-data.routing';

@NgModule({
    declarations: [
        SecuringYourDataComponent,
    ],
    imports: [
        CommonModule,
        NotificationLayoutContainerModule,
        SecuringYourDataRoutingModule,
    ],
})
export class SecuringYourDataModule {}
