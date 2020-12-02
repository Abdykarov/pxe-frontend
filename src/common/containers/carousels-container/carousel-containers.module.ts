import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CarouselContainerComponent } from 'src/common/containers/carousels-container/old/carousel-container.component';
import { CarouselModule } from 'src/common/ui/carousel/carousel.module';
import { CarouselReferencesComponent } from './carousel-references/carousel-references.component';

@NgModule({
    declarations: [
        CarouselContainerComponent,
        CarouselReferencesComponent,
    ],
    exports: [
        CarouselContainerComponent,
        CarouselReferencesComponent,
    ],
    imports: [
        CommonModule,
        CarouselModule,
    ],
})
export class CarouselContainersModule { }
