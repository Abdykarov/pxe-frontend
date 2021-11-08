import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { AccordionModule } from 'src/common/ui/accordion/accordion.module';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
// own classes
import { AccordionPageComponent } from './page';

@NgModule({
    declarations: [AccordionPageComponent],
    exports: [AccordionPageComponent],
    imports: [AccordionModule, BreadcrumbModule, CommonModule],
})
export class AccordionPageModule {}

export const accordionPageRoutes: Routes = [
    {
        path: 'accordion',
        component: AccordionPageComponent,
    },
];
