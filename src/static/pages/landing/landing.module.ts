import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { AccordionModule } from 'src/common/ui/accordion/accordion.module';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { CardModule } from 'src/common/ui/card/card.module';
import { CarouselModule } from 'src/common/ui/carousel/carousel.module';
import { CarouselContainersModule } from 'src/common/containers/carousels-container/carousel-containers.module';
import { FileUploaderModule } from 'src/common/ui/file-uploader/file-uploader.module';
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
        AccordionModule,
        BreadcrumbModule,
        ButtonModule,
        CardModule,
        CarouselModule,
        CarouselContainersModule,
        CommonModule,
        FileUploaderModule,
        FormModule,
        MapCoverageModule,
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
            isLandingPage: true,
            isSimpleFooter: true,
            loginType: LoginType.NONE,
            signUpType: SignType.STATIC,
        },
    },
];
