import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { ProgressBarComponent } from './progress-bar';
import { ProgressBarModule } from 'src/common/ui/progress-bar/progress-bar.module';

@NgModule({
    declarations: [
        ProgressBarComponent,
    ],
    exports: [
        ProgressBarComponent,
    ],
    imports: [
        BreadcrumbModule,
        CommonModule,
        ProgressBarModule,
    ],
})
export class ProgressBarPageModule {}

export const progressBarPageRoutes: Routes = [
    {
        path: 'progress',
        component: ProgressBarComponent,
        data: {
            isPublic: false,
        },
    },
];
