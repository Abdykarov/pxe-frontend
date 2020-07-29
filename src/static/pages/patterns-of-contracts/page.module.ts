import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { BannerUIModule } from 'src/common/ui/banner/banner-ui.module';

// own classes
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import {
    LoginType,
    SignType,
} from 'src/app/layouts/models/router-data.model';
import { TableModule } from 'src/common/ui/table/table.module';
import { PatternsOfContractsPageComponent } from './page';
import { PdfViewerModule } from 'src/common/ui/pdf-viewer/pdf-viewer.module';

@NgModule({
    declarations: [
        PatternsOfContractsPageComponent,
    ],
    exports: [
        PatternsOfContractsPageComponent,
    ],
    imports: [
        BannerUIModule,
        BreadcrumbModule,
        ButtonModule,
        CommonModule,
        PdfViewerModule,
        TableModule,
    ],
})
export class PatternsOfContractsPageModule {}

export const patternsOfContractsPageRoutes: Routes = [
    {
        path: 'patterns-of-contracts',
        component: PatternsOfContractsPageComponent,
        data: {
            isPublic: true,
            loginType: LoginType.NONE,
            signUpType: SignType.STATIC,
        },
    },
];
