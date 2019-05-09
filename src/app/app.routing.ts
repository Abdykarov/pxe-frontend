import { NgModule } from '@angular/core';
import {
    PreloadAllModules,
    Routes,
    RouterModule,
} from '@angular/router';

import { AuthGuard } from 'src/app/guards/auth.guard';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import {
    EMPTY,
    SECURED,
    WILD_CART,
} from './routes/paths';

const routes: Routes = [
    {
        path: EMPTY,
        loadChildren: './layouts/public/public-layout.module#PublicLayoutModule',
    },
    {
        path: SECURED,
        canActivate: [AuthGuard],
        loadChildren: './layouts/secured/secured-layout.module#SecuredLayoutModule',
    },
    {
        path: WILD_CART,
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
