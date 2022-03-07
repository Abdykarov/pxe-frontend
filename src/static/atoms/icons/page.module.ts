import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
// own classes
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { IconsPageComponent } from './page';

@NgModule({
    declarations: [IconsPageComponent],
    exports: [IconsPageComponent],
    imports: [BreadcrumbModule, CommonModule],
})
export class IconsPageModule {}

export const iconsPageRoutes: Routes = [
    {
        path: 'icons',
        component: IconsPageComponent,
    },
];
