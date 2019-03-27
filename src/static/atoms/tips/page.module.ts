import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

// own classes
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { TipsPageComponent } from './page';
import { TipsModule } from 'src/common/ui/tips/tips.module';

@NgModule({
    declarations: [
        TipsPageComponent,
    ],
    exports: [
        TipsPageComponent,
    ],
    imports: [
        BreadcrumbModule,
        CommonModule,
        TipsModule,
    ],
})
export class TipsPageModule {}

export const tipsPageRoutes: Routes = [
    {
        path: 'tips',
        component: TipsPageComponent,
    },
];
