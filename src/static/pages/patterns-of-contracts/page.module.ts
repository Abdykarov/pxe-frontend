import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

// own classes
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { PatternsOfContractsPageComponent } from './page';
import {
    LoginType,
    SignType,
} from 'src/app/layouts/models/router-data.model';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';

@NgModule({
    declarations: [
        PatternsOfContractsPageComponent,
    ],
    exports: [
        PatternsOfContractsPageComponent,
    ],
    imports: [
        CommonModule,
        BreadcrumbModule,
        PdfJsViewerModule,
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
