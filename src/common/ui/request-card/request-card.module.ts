import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BadgeModule } from 'src/common/ui/badge/badge.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { PipesModule } from 'src/common/pipes/common/pipes.module';
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
        PipesModule,
        ProgressBarModule,
    ],
})
export class RequestCardModule {}
