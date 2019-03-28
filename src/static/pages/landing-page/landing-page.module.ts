import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import {Routes} from '@angular/router';
import {ErrorPagePageComponent} from '../error-page-404/page';

@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
  ],
})
export class LandingPageModule { }


export const landingPagePageRoutes: Routes = [
    {
        path: 'landing-page',
        component: LandingPageComponent,
    },
];
