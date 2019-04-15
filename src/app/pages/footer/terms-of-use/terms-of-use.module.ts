import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import {
    NotificationLayoutContainerModule,
} from 'src/common/containers/notification-layout-container/notification-layout-container.module';
import { TermsOfUseComponent } from './terms-of-use.component';
import { TermsOfUseRoutingModule } from './terms-of-use.routing';

@NgModule({
    declarations: [
        TermsOfUseComponent,
    ],
    imports: [
        CommonModule,
        NotificationLayoutContainerModule,
        TermsOfUseRoutingModule,
    ],
})
export class TermsOfUseModule {}
