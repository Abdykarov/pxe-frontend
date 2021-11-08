import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
// own classes
import { BreadcrumbModule } from 'src/common/ui/breadcrumb/breadcrumb.module';
import { CarouselContainersModule } from 'src/common/ui/carousels/carousel-containers.module';
import { CarouselComponent } from './page';

@NgModule({
    declarations: [CarouselComponent],
    exports: [CarouselComponent],
    imports: [BreadcrumbModule, CommonModule, CarouselContainersModule],
})
export class CarouselPageModule {}

export const carouselPageRoutes: Routes = [
    {
        path: 'carousel',
        component: CarouselComponent,
    },
];
