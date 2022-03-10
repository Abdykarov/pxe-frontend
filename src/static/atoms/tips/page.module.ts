import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
// own classes
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { TipsModule } from 'src/common/ui/tips/tips.module';
import { TipsPageComponent } from './page';

@NgModule({
    declarations: [TipsPageComponent],
    exports: [TipsPageComponent],
    imports: [BreadcrumbModule, CommonModule, TipsModule],
})
export class TipsPageModule {}

export const tipsPageRoutes: Routes = [
    {
        path: 'tips',
        component: TipsPageComponent,
    },
];
