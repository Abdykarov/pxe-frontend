import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';

import { environment } from 'src/environments/environment';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AuthService } from 'src/app/services/auth.service';

const routes: Routes = [
    {
        path: 'secured',
        canActivate: [AuthGuard],
        loadChildren: './layouts/secured/secured-layout.module#SecuredLayoutModule',
    },
    {
        path: '',
        loadChildren: './layouts/public/public-layout.module#PublicLayoutModule',
    },
    {
        path: '**',
        redirectTo: '',
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            routes,
            {
                enableTracing: !!environment.production,
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
