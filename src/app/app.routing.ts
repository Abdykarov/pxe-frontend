import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { PaymentGuard } from 'src/common/guards/payment.guard';
import { AuthService } from 'src/common/services/auth.service';
import { CmsResolver } from '../common/resolvers/cms.resolver';
import { CONSTS } from './app.constants';

const routes: Routes = [
    {
        path: CONSTS.PATHS.GENERATE_DATA,
        loadChildren: () =>
            import('./layouts/generate-data/generate-data-layout.module').then(
                (m) => m.GenerateDataLayoutModule
            ),
        resolve: {
            cmsToken: CmsResolver,
        },
    },
    {
        path: CONSTS.PATHS.O_AUTH,
        loadChildren: () =>
            import('./layouts/o-auth/o-auth-layout.module').then(
                (m) => m.OAuthLayoutModule
            ),
    },
    {
        path: CONSTS.PATHS.SECURED,
        canActivateChild: [AuthGuard, PaymentGuard],
        loadChildren: () =>
            import('./layouts/secured/secured-layout.module').then(
                (m) => m.SecuredLayoutModule
            ),
        resolve: {
            cmsToken: CmsResolver,
        },
    },
    {
        path: CONSTS.PATHS.EMPTY,
        loadChildren: () =>
            import('./layouts/public/public-layout.module').then(
                (m) => m.PublicLayoutModule
            ),
        resolve: {
            cmsToken: CmsResolver,
        },
    },
    {
        path: CONSTS.PATHS.WILD_CART,
        loadChildren: () =>
            import('./pages/not-found/not-found.module').then(
                (m) => m.NotFoundModule
            ),
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            enableTracing: false,
            initialNavigation: 'enabled',
            scrollPositionRestoration: 'top',
            relativeLinkResolution: 'legacy',
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {
    constructor(private authService: AuthService) {
        this.authService.checkLogin();
    }
}
