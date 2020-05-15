import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from 'src/common/ui/button/button.module';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { ListOfNotificationsModule } from 'src/common/ui/list-of-notifications/list-of-notifications.module';
import { ProgressBarModule } from 'src/common/ui/progress-bar/progress-bar.module';
import { SignboardComponent } from './signboard.component';
import { SignboardRoutingModule } from './signboard-routing.module';

@NgModule({
    declarations: [
        SignboardComponent,
    ],
    imports: [
        CommonModule,
        ButtonModule,
        LayoutContainerModule,
        ProgressBarModule,
        SignboardRoutingModule,
    ],
})
export class SignboardModule { }
