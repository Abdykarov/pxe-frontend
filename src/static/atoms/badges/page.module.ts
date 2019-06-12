import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

// own classes
import { BadgesPageComponent } from './page';

// own modules
import { BadgeModule } from 'src/common/ui/badge/badge.module';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';

@NgModule({
    declarations: [
        BadgesPageComponent,
    ],
    exports: [
        BadgesPageComponent,
    ],
    imports: [
        BreadcrumbModule,
        BadgeModule,
        CommonModule,
    ],
})
export class BadgesPageModule {}

export const badgesPageRoutes: Routes = [
    {
        path: 'badges',
        component: BadgesPageComponent,
    },
];
