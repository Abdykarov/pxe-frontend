import { NgModule } from '@angular/core';
import {
    PreloadAllModules,
    Routes,
    RouterModule,
} from '@angular/router';

import { AuthGuard } from 'src/app/guards/auth.guard';
import { AuthService } from 'src/app/services/auth.service';
import { CONSTS } from './app.constants';
import { environment } from 'src/environments/environment';

const routes: Routes = [
    {
        path: CONSTS.PATHS.EMPTY,
        loadChildren: './layouts/public/public-layout.module#PublicLayoutModule',
    },
    {
        path: CONSTS.PATHS.SECURED,
        // canActivateChild: [AuthGuard],
        loadChildren: './layouts/secured/secured-layout.module#SecuredLayoutModule',
    },
    {
        path: CONSTS.PATHS.WILD_CART,
        redirectTo: '',
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            routes,
            {
                enableTracing: environment.production || false,
                preloadingStrategy: PreloadAllModules,
                initialNavigation: 'enabled',
                scrollPositionRestoration: 'top',
            },
        ),
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
