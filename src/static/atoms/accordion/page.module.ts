import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

// own classes
import { AccordionPageComponent } from './page';
import { AccordionModule } from 'src/common/ui/accordion/accordion.module';
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';

@NgModule({
    declarations: [
        AccordionPageComponent,
    ],
    exports: [
        AccordionPageComponent,
    ],
    imports: [
        AccordionModule,
        BreadcrumbModule,
        CommonModule,
    ],
})
export class AccordionPageModule {}

export const accordionPageRoutes: Routes = [
    {
        path: 'accordion',
        component: AccordionPageComponent,
    },
];
