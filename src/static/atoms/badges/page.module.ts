import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
// own modules
import { BadgeModule } from 'src/common/ui/badge/badge.module';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
// own classes
import { BadgesPageComponent } from './page';

@NgModule({
    declarations: [BadgesPageComponent],
    exports: [BadgesPageComponent],
    imports: [BreadcrumbModule, BadgeModule, CommonModule],
})
export class BadgesPageModule {}

export const badgesPageRoutes: Routes = [
    {
        path: 'badges',
        component: BadgesPageComponent,
    },
];
