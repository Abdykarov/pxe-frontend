import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    CarouselPageModule,
    carouselPageRoutes,
} from 'src/static/organisms/carousel/page.module';
import {
    AccountDeletedPageModule,
    accountDeletedPageRoutes,
} from 'src/static/pages/account-deleted/page.module';
import {
    ChangePasswordPageModule,
    changePasswordPageRoutes,
} from 'src/static/pages/change-password/page.module';
import {
    CookiesPageModule,
    cookiesPageRoutes,
} from 'src/static/pages/cookies/page.module';
import {
    Error404PageModule,
    error404PageRoutes,
} from 'src/static/pages/error-404/page.module';
import {
    Error500PageModule,
    error500PageRoutes,
} from 'src/static/pages/error-500/page.module';
import {
    FaqDetailPageModule,
    faqDetailPageRoutes,
} from 'src/static/pages/faq-detail/page.module';
import { FaqPageModule, faqPageRoutes } from 'src/static/pages/faq/page.module';
import {
    ImportApprovalModule,
    importApprovalPageRoutes,
} from 'src/static/pages/import-approval/page.module';
import {
    LandingModule,
    landingPageRoutes,
} from 'src/static/pages/landing/landing.module';
import {
    LoginAfterRegistrationPageModule,
    loginAfterRegistrationPageRoutes,
} from 'src/static/pages/login-after-registration/page.module';
import {
    LoginPageModule,
    loginPageRoutes,
} from 'src/static/pages/login/page.module';
import {
    PatternsOfContractsPageModule,
    patternsOfContractsPageRoutes,
} from 'src/static/pages/patterns-of-contracts/page.module';
import {
    RegistrationPageModule,
    registrationPageRoutes,
} from 'src/static/pages/registration/page.module';
import {
    SupplierProfilePageModule,
    supplierProfilePageRoutes,
} from 'src/static/pages/supplier-profile/page.module';
import {
    SupplyOfferEmptyPageModule,
    supplyOfferEmptyPageRoutes,
} from 'src/static/pages/supply-offer-empty/page.module';
import {
    SupplyOfferPageModule,
    supplyOfferPageRoutes,
} from 'src/static/pages/supply-offer/page.module';
import { FullLayoutComponent } from './full-layout.component';

const routes: Routes = [
    {
        path: '',
        component: FullLayoutComponent,
        children: [
            ...accountDeletedPageRoutes,
            ...carouselPageRoutes,
            ...cookiesPageRoutes,
            ...changePasswordPageRoutes,
            ...faqPageRoutes,
            ...faqDetailPageRoutes,
            ...error404PageRoutes,
            ...error500PageRoutes,
            ...importApprovalPageRoutes,
            ...landingPageRoutes,
            ...loginPageRoutes,
            ...loginAfterRegistrationPageRoutes,
            ...patternsOfContractsPageRoutes,
            ...registrationPageRoutes,
            ...supplyOfferPageRoutes,
            ...supplyOfferEmptyPageRoutes,
            ...supplierProfilePageRoutes,
            {
                path: '**',
                redirectTo: '',
            },
        ],
    },
];

@NgModule({
    imports: [
        AccountDeletedPageModule,
        CarouselPageModule,
        CookiesPageModule,
        ChangePasswordPageModule,
        Error404PageModule,
        Error500PageModule,
        FaqPageModule,
        FaqDetailPageModule,
        ImportApprovalModule,
        LandingModule,
        LoginPageModule,
        LoginAfterRegistrationPageModule,
        PatternsOfContractsPageModule,
        RegistrationPageModule,
        RouterModule.forChild(routes),
        SupplierProfilePageModule,
        SupplyOfferEmptyPageModule,
        SupplyOfferPageModule,
    ],
    exports: [RouterModule],
})
export class FullLayoutRoutingModule {}
