import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PipesModule } from 'src/common/pipes/common/pipes.module';
import { AlertModule } from 'src/common/ui/alert/alert.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { InfoBannerModule } from 'src/common/ui/info-banner/info-banner.module';
import { ProgressBarModule } from 'src/common/ui/progress-bar/progress-bar.module';
import { TableModule } from 'src/common/ui/table/table.module';
import { TooltipModule } from 'src/common/ui/tooltip/tooltip.module';
import { ApprovalRoutingModule } from './approval-routing.module';
import { ApprovalComponent } from './approval.component';

@NgModule({
    declarations: [ApprovalComponent],
    imports: [
        AlertModule,
        ApprovalRoutingModule,
        ButtonModule,
        CommonModule,
        InfoBannerModule,
        PipesModule,
        ProgressBarModule,
        TableModule,
        TooltipModule,
    ],
})
export class ApprovalModule {}
