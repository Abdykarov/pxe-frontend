import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginType, SignType } from 'src/app/layouts/models/router-data.model';
import { AccordionModule } from 'src/common/ui/accordion/accordion.module';
import { BadgeModule } from 'src/common/ui/badge/badge.module';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { FaqDetailPageComponent } from './page';

@NgModule({
    declarations: [FaqDetailPageComponent],
    exports: [FaqDetailPageComponent],
    imports: [
        AccordionModule,
        BadgeModule,
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
