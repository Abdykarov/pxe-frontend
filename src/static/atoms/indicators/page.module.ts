import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
// own classes
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { IndicatorModule } from 'src/common/ui/indicator/indicator.module';
import { IndicatorsPageComponent } from './page';

@NgModule({
    declarations: [IndicatorsPageComponent],
    exports: [IndicatorsPageComponent],
    imports: [BreadcrumbModule, CommonModule, IndicatorModule],
})
export class IndicatorsPageModule {}

export const indicatorsPageRoutes: Routes = [
    {
        path: 'indicators',
        component: IndicatorsPageComponent,
    },
];
