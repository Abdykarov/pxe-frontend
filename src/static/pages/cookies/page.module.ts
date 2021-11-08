import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginType, SignType } from 'src/app/layouts/models/router-data.model';
// own classes
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { CookiesPageComponent } from './page';

@NgModule({
    declarations: [CookiesPageComponent],
    exports: [CookiesPageComponent],
    imports: [CommonModule, BreadcrumbModule],
})
export class CookiesPageModule {}

export const cookiesPageRoutes: Routes = [
    {
        path: 'cookies',
        component: CookiesPageComponent,
        data: {
            isPublic: true,
            loginType: LoginType.NONE,
            signUpType: SignType.STATIC,
        },
    },
];
