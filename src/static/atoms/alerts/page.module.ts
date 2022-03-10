import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
// own classes
import { AlertModule } from 'src/common/ui/alert/alert.module';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { AlertsPageComponent } from './page';

@NgModule({
    declarations: [AlertsPageComponent],
    exports: [AlertsPageComponent],
    imports: [AlertModule, BreadcrumbModule, CommonModule],
})
export class AlertsPageModule {}

export const alertsPageRoutes: Routes = [
    {
        path: 'alerts',
        component: AlertsPageComponent,
    },
];
