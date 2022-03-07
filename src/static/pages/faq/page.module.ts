import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginType, SignType } from 'src/app/layouts/models/router-data.model';
import { AccordionModule } from 'src/common/ui/accordion/accordion.module';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { FaqPageComponent } from './page';

@NgModule({
    declarations: [FaqPageComponent],
    exports: [FaqPageComponent],
    imports: [AccordionModule, BreadcrumbModule, ButtonModule, CommonModule],
})
export class FaqPageModule {}

export const faqPageRoutes: Routes = [
    {
        path: 'faq',
        component: FaqPageComponent,
        data: {
            isPublic: true,
            isLandingPage: true,
            isSimpleFooter: true,
            loginType: LoginType.NONE,
            signUpType: SignType.STATIC,
        },
    },
];
