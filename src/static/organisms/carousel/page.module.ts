import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

// own classes
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { CarouselModule } from 'src/common/ui/carousel/carousel.module';
import { CarouselPageComponent } from './page';

@NgModule({
    declarations: [
        CarouselPageComponent,
    ],
    exports: [
        CarouselPageComponent,
    ],
    imports: [
        BreadcrumbModule,
        CarouselModule,
        CommonModule,
    ],
})
export class CarouselPageModule {}

export const carouselPageComponent: Routes = [
    {
        path: 'carousel',
        component: CarouselPageComponent,
    },
];
