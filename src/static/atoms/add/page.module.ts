import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

// own classes
import { AddPageComponent } from './page';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';

// own modules
import { AddModule } from 'src/common/ui/add/add.module';

@NgModule({
    declarations: [
        AddPageComponent,
    ],
    exports: [
        AddPageComponent,
    ],
    imports: [
        AddModule,
        BreadcrumbModule,
        CommonModule,
    ],
})
export class AddPageModule {}

export const addPageRoutes: Routes = [
    {
        path: 'add',
        component: AddPageComponent,
    },
];
