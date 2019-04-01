import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LandingComponent} from './landing.component';
import {Routes} from '@angular/router';
import {BreadcrumbModule} from '../../../common/ui/breadcrumb/breadcrumb.module';


@NgModule({
    declarations: [
        LandingComponent,
    ],
    exports: [
        LandingComponent,
    ],
    imports: [
        CommonModule,
        BreadcrumbModule,
    ],
})
export class LandingModule { }

export const landingPageRoutes: Routes = [
    {
        path: 'landing-page',
        component: LandingComponent,
    },
];
