import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    RouterModule,
    Routes,
} from '@angular/router';

import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { LandingComponent } from './landing.component';
import {
    LoginType,
    SignType,
} from 'src/app/layouts/models/router-data.model';
import { MapCoverageModule } from 'src/common/ui/map-coverage/map-coverage.module';
import { RegistrationFormModule } from 'src/common/containers/form/forms/registration/registration-form.module';
import { SupplierModule } from 'src/common/ui/supplier/supplier.module';

@NgModule({
    declarations: [
        LandingComponent,
    ],
    exports: [
        LandingComponent,
    ],
    imports: [
        BreadcrumbModule,
        ButtonModule,
        CommonModule,
        FormModule,
        MapCoverageModule,
        RouterModule,
        RegistrationFormModule,
        SupplierModule,
    ],
})
export class LandingModule { }

export const landingPageRoutes: Routes = [
    {
        path: 'landing-page',
        component: LandingComponent,
        data: {
            isPublic: true,
            isSimpleFooter: true,
            loginType: LoginType.NONE,
            signUpType: SignType.STATIC,
        },
    },
];
