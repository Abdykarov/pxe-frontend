import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
// own classes
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { TypographyPageComponent } from './page';

@NgModule({
    declarations: [TypographyPageComponent],
    exports: [TypographyPageComponent],
    imports: [BreadcrumbModule, CommonModule],
})
export class TypographyPageModule {}

export const typographyPageRoutes: Routes = [
    {
        path: 'typography',
        component: TypographyPageComponent,
    },
];
