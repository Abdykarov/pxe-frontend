import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

// own classes
import { BannerUIModule } from 'src/common/ui/banner/banner-ui.module';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import {
    LoginType,
    SignType,
} from 'src/app/layouts/models/router-data.model';
import { PatternsOfContractsPageComponent } from './page';
import { PdfViewerModule } from 'src/common/ui/pdf-viewer/pdf-viewer.module';
import { TableModule } from 'src/common/ui/table/table.module';

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
