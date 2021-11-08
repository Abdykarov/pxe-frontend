import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
// own modules
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { TooltipModule } from 'src/common/ui/tooltip/tooltip.module';
// own classes
import { TooltipPageComponent } from './page';

@NgModule({
    declarations: [TooltipPageComponent],
    exports: [TooltipPageComponent],
    imports: [BreadcrumbModule, CommonModule, TooltipModule],
})
export class TooltipPageModule {}

export const tooltipPageRoutes: Routes = [
    {
        path: 'tooltip',
        component: TooltipPageComponent,
    },
];
