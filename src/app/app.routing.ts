import { NgModule } from '@angular/core';
import {
    PreloadAllModules,
    Routes,
    RouterModule,
} from '@angular/router';

import { AuthGuard } from 'src/app/guards/auth.guard';
import { AuthService } from 'src/app/services/auth.service';
import { CONSTS } from './app.constants';
import { PaymentGuard } from 'src/app/guards/payment.guard';
import { CmsResolver } from './resolvers/cms.resolver';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        loadChildren: () => import('./layouts/public/public-layout.module').then(m => m.PublicLayoutModule),
        resolve: {
            cmsToken: CmsResolver,
        },
    },
    {
        path: CONSTS.PATHS.SECURED,
        canActivateChild: [
            AuthGuard,
            PaymentGuard,
        ],
        loadChildren: () => import('./layouts/secured/secured-layout.module').then(m => m.SecuredLayoutModule),
        resolve: {
            cmsToken: CmsResolver,
        },
    },
    {
        path: CONSTS.PATHS.WILD_CART,
        loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule),
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
        enableTracing: false,
        preloadingStrategy: PreloadAllModules,
        initialNavigation: 'enabled',
        scrollPositionRestoration: 'top',
    }),
    ],
    exports: [
        RouterModule,
    ],
})
export class AppRoutingModule {
    constructor(
        private authService: AuthService,
    ) {
        this.authService.checkLogin();
    }
}
