import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { FullLayoutComponent } from './full-layout.component';

import { CookiesPageModule, cookiesPageRoutes } from 'src/static/pages/cookies/page.module';
import { LandingModule, landingPageRoutes } from 'src/static/pages/landing/landing.module';
import { SignUpModule, signUpPageRoutes } from 'src/static/pages/sign-up/sign-up.module';

const routes: Routes = [
    {
        path: '',
        component: FullLayoutComponent,
        children: [
            ...cookiesPageRoutes,
            ...landingPageRoutes,
            ...signUpPageRoutes,
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
        LandingModule,
        SignUpModule,
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class FullLayoutRoutingModule {}
