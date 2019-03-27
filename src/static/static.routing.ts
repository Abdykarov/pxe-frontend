import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
} from '@angular/router';
import { environment } from 'src/environments/environment';
import {ErrorPagePageModule, errorPagePageRoutes} from './pages/error-page-404/page.module';


const routes: Routes = [
    ...errorPagePageRoutes,
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
                enableTracing: !environment.production,
            },
        ),
        ErrorPagePageModule,
    ],
    exports: [
        RouterModule,
    ],
})
export class StaticRoutingModule {}
