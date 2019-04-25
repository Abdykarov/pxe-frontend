import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

// own classes
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { NewSupplyPointPageComponent } from './page';

@NgModule({
    declarations: [
        NewSupplyPointPageComponent,
    ],
    exports: [
        NewSupplyPointPageComponent,
    ],
    imports: [
        CommonModule,
        BreadcrumbModule,
    ],
})
export class NewSupplyPointPageModule {}

export const newSupplyPointPageRoutes: Routes = [
    {
        path: 'new-supply-point',
        component: NewSupplyPointPageComponent,
    },
];
