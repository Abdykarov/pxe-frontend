import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginType, SignType } from 'src/app/layouts/models/router-data.model';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { InfoBannerModule } from 'src/common/ui/info-banner/info-banner.module';
import { ProgressBarModule } from 'src/common/ui/progress-bar/progress-bar.module';
import { TableModule } from 'src/common/ui/table/table.module';
import { TooltipModule } from 'src/common/ui/tooltip/tooltip.module';
import { ImportApprovalComponent } from 'src/static/pages/import-approval/page';

@NgModule({
    declarations: [ImportApprovalComponent],
    exports: [ImportApprovalComponent],
    imports: [
        BreadcrumbModule,
        ButtonModule,
        CommonModule,
        InfoBannerModule,
        ProgressBarModule,
        TableModule,
        TooltipModule,
    ],
})
export class ImportApprovalModule {}

export const importApprovalPageRoutes: Routes = [
    {
        path: 'import-approval',
        component: ImportApprovalComponent,
        data: {
            isPublic: true,
            loginType: LoginType.NONE,
            signUpType: SignType.NONE,
        },
    },
];
