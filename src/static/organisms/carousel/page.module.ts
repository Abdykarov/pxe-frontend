import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

// own classes
import { CarouselComponent } from './page';
import { CarouselContainerModule } from 'src/common/containers/carousel-container/carousel-container.module';

@NgModule({
    declarations: [
        CarouselComponent,
    ],
    exports: [
        CarouselComponent,
    ],
    imports: [
        CommonModule,
        CarouselContainerModule,
    ],
})
export class CarouselPageModule {}

export const carouselPageRoutes: Routes = [
    {
        path: 'carousel',
        component: CarouselComponent,
    },
];
