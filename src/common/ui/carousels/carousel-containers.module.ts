import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CarouselCompareComponent } from './carousel-compare/carousel-compare.component';
import { CarouselModule } from 'src/common/ui/carousel/carousel.module';
import { CarouselReferencesComponent } from './carousel-references/carousel-references.component';
import { CarouselSuppliersComponent } from './carousel-suppliers/carousel-suppliers.component';

@NgModule({
    declarations: [
        CarouselCompareComponent,
        CarouselReferencesComponent,
        CarouselSuppliersComponent,
    ],
    exports: [
        CarouselCompareComponent,
        CarouselReferencesComponent,
        CarouselSuppliersComponent,
    ],
    imports: [
        CommonModule,
        CarouselModule,
        RouterModule,
    ],
})
export class CarouselContainersModule { }
