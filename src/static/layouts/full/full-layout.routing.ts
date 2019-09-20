import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { FullLayoutComponent } from './full-layout.component';

import { CookiesPageModule, cookiesPageRoutes } from 'src/static/pages/cookies/page.module';
import { ChangePasswordPageModule, changePasswordPageRoutes } from 'src/static/pages/change-password/page.module';
import { LandingModule, landingPageRoutes } from 'src/static/pages/landing/landing.module';
import { LoginPageModule, loginPageRoutes } from 'src/static/pages/login/page.module';
import { LoginAfterRegistrationPageModule, loginAfterRegistrationPageRoutes } from 'src/static/pages/login-after-registration/page.module';
import { RegistrationPageModule, registrationPageRoutes } from 'src/static/pages/registration/page.module';
import { SupplyOfferPageModule, supplyOfferPageRoutes } from 'src/static/pages/supply-offer/page.module';
import {
    SupplierConcludedContractsModule,
    supplierConcludedContractsRoutes,
} from 'src/static/pages/supplier-concluded-contracts/page.module';

const routes: Routes = [
    {
        path: '',
        component: FullLayoutComponent,
        children: [
            ...cookiesPageRoutes,
            ...changePasswordPageRoutes,
            ...landingPageRoutes,
            ...loginPageRoutes,
            ...loginAfterRegistrationPageRoutes,
            ...registrationPageRoutes,
            ...supplierConcludedContractsRoutes,
            ...supplyOfferPageRoutes,
            {
                path: '**',
                redirectTo: '',
            },
        ],
    },
];

@NgModule({
    imports: [
        CookiesPageModule,
        ChangePasswordPageModule,
        LandingModule,
        LoginPageModule,
        LoginAfterRegistrationPageModule,
        RegistrationPageModule,
        RouterModule.forChild(routes),
        SupplierConcludedContractsModule,
        SupplyOfferPageModule,
    ],
    exports: [
        RouterModule,
    ],
})
export class FullLayoutRoutingModule {}
