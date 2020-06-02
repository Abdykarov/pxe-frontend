import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { ButtonModule } from 'src/common/ui/button/button.module';
import { ProgressBarModule } from 'src/common/ui/progress-bar/progress-bar.module';
import { SignboardComponent } from 'src/static/pages/signboard/page';

@NgModule({
    declarations: [
        SignboardComponent,
    ],
    exports: [
        SignboardComponent,
    ],
    imports: [
        BreadcrumbModule,
        ButtonModule,
        CommonModule,
        ProgressBarModule,
    ],
})
export class SignboardPageModule {}

export const signboardPageRoutes: Routes = [
    {
        path: 'signboard',
        component: SignboardComponent,
    },
];
