import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BadgeModule } from '../badge/badge.module';
import { ButtonModule } from '../button/button.module';
import { ProgressBarModule } from 'src/common/ui/progress-bar/progress-bar.module';
import { RequestCardComponent } from './request-card.component';

@NgModule({
    declarations: [
        RequestCardComponent,
    ],
    exports: [
        RequestCardComponent,
    ],
    imports: [
        BadgeModule,
        ButtonModule,
        CommonModule,
        ProgressBarModule,
    ],
})
export class RequestCardModule {}
