import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CarouselModule as NgxCarouselModule } from 'ngx-bootstrap/carousel';
import { CarouselComponent } from './carousel.component';

@NgModule({
    declarations: [CarouselComponent],
    exports: [CarouselComponent],
    imports: [CommonModule, NgxCarouselModule],
})
export class CarouselModule {}
