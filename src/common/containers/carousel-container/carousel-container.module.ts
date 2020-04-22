import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CarouselContainerComponent } from 'src/common/containers/carousel-container/carousel-container.component';
import { CarouselModule } from 'src/common/ui/carousel/carousel.module';

@NgModule({
    declarations: [
        CarouselContainerComponent,
    ],
    exports: [
        CarouselContainerComponent,
    ],
    imports: [
        CommonModule,
        CarouselModule,
    ],
})
export class CarouselContainerModule { }
