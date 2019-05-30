import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes } from '@angular/router';

import { AddressWhispererModule } from 'src/common/containers/address-whisperer/address-whisperer.module';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { PersonalInfoFormModule } from 'src/common/containers/form/forms/personal-info/personal-info-form.module';
import { FormModule } from 'src/common/ui/forms/form.module';
import { ProgressBarModule } from 'src/common/ui/progress-bar/progress-bar.module';
import { RecapitulationPageComponent} from './page';

@NgModule({
    declarations: [
        RecapitulationPageComponent,
    ],
    exports: [
        RecapitulationPageComponent,
    ],
    imports: [
        AddressWhispererModule,
        BreadcrumbModule,
        ButtonModule,
        CommonModule,
        FormModule,
        PersonalInfoFormModule,
        ProgressBarModule,
        ReactiveFormsModule,
    ],
})
export class RecapitulationPageModule {}

export const recapitulationPageRoutes: Routes = [
    {
        path: 'recapitulation',
        component: RecapitulationPageComponent,
    },
];
