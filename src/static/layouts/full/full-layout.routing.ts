import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { FullLayoutComponent } from './full-layout.component';

import { ChangePasswordPageModule, changePasswordPageRoutes } from 'src/static/pages/change-password/page.module';
import { CookiesPageModule, cookiesPageRoutes } from 'src/static/pages/cookies/page.module';
import { LandingModule, landingPageRoutes } from 'src/static/pages/landing/landing.module';
import { LoginPageModule, loginPageRoutes } from 'src/static/pages/login/page.module';
import { LoginAfterRegistrationPageModule, loginAfterRegistrationPageRoutes } from 'src/static/pages/login-after-registration/page.module';
import { RegistrationPageModule, registrationPageRoutes } from 'src/static/pages/registration/page.module';

const routes: Routes = [
    {
        path: '',
        component: FullLayoutComponent,
        children: [
            ...changePasswordPageRoutes,
            ...cookiesPageRoutes,
            ...landingPageRoutes,
            ...loginPageRoutes,
            ...loginAfterRegistrationPageRoutes,
            ...registrationPageRoutes,
            {
                path: '**',
                redirectTo: '',
            },
        ],
    },
];

@NgModule({
    imports: [
        ChangePasswordPageModule,
        CookiesPageModule,
        LandingModule,
        LoginPageModule,
        LoginAfterRegistrationPageModule,
        RegistrationPageModule,
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class FullLayoutRoutingModule {}
