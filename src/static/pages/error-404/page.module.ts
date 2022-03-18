import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginType, SignType } from 'src/app/layouts/models/router-data.model';
// own classes
import { Error404PageComponent } from './page';

@NgModule({
    declarations: [Error404PageComponent],
    exports: [Error404PageComponent],
    imports: [CommonModule],
})
export class Error404PageModule {}

export const error404PageRoutes: Routes = [
    {
        path: 'error-404',
        component: Error404PageComponent,
        data: {
            isPublic: true,
            isPublicEmptyPage: true,
            isLandingPage: false,
            isSimpleFooter: false,
            loginType: LoginType.NONE,
            signUpType: SignType.NONE,
        },
    },
];
