import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BannerUIModule } from 'src/common/ui/banner/banner-ui.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing';
import { LayoutContainerModule } from 'src/common/containers/layout-container/layout-container.module';
import { PersonalInfoFormModule } from 'src/common/containers/form/forms/personal-info/personal-info-form.module';

@NgModule({
    declarations: [
        DashboardComponent,
    ],
    imports: [
        CommonModule,
        BannerUIModule,
        DashboardRoutingModule,
        LayoutContainerModule,
        PersonalInfoFormModule,
    ],
})
export class DashboardModule { }
