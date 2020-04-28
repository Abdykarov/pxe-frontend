import { CommonModule } from '@angular/common';
import {
    LoginType,
    SignType,
} from 'src/app/layouts/models/router-data.model';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { AccordionModule } from 'src/common/ui/accordion/accordion.module';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { FaqDetailPageComponent } from './page';

@NgModule({
    declarations: [
        FaqDetailPageComponent,
    ],
    exports: [
        FaqDetailPageComponent,
    ],
    imports: [
        AccordionModule,
        BreadcrumbModule,
        ButtonModule,
        CommonModule,
    ],
})
export class FaqDetailPageModule {}

export const faqDetailPageRoutes: Routes = [
    {
        path: 'faq-detail',
        component: FaqDetailPageComponent,
        data: {
            isPublic: true,
            isLandingPage: true,
            isSimpleFooter: true,
            loginType: LoginType.NONE,
            signUpType: SignType.STATIC,
        },
    },
];
