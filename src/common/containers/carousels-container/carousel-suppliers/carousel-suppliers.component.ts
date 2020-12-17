import {
    Component,
    Inject,
    PLATFORM_ID,
    ViewEncapsulation,
} from '@angular/core';

import { takeUntil } from 'rxjs/operators';

import { AbstractResizeComponent } from 'src/common/abstract-resize.component';
import { mapTypeOfDeviceToNumberOfSlides } from './carousel-suppliers.config';
import { supplierLogos } from 'src/common/containers/carousels-container/carousel-suppliers/carousel-suppliers.config';
import { TypeOfResolution } from 'src/common/models/type-of-resolution';
import {isPlatformBrowser} from '@angular/common';

@Component({
    selector: 'pxe-carousel-suppliers',
    styleUrls: ['carousel-suppliers.component.scss'],
    templateUrl: './carousel-suppliers.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class CarouselSuppliersComponent extends AbstractResizeComponent {
    public readonly height = 30;

    public numberOfSlides = null;

    public supplierLogos = supplierLogos;

    public deviceCouldChanged = (typeOfResolution: TypeOfResolution) =>
        this.numberOfSlides = mapTypeOfDeviceToNumberOfSlides[typeOfResolution]

    constructor(
        @Inject(PLATFORM_ID) private platformId: string,
    ) {
        super();

        if (isPlatformBrowser(this.platformId)) {

            this.deviceCouldChanged(this.getTypeOfDevice());

            this.resizeEvent$
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    this.showCarousel = false;
                    this.numberOfSlides = this.deviceCouldChanged(this.getTypeOfDevice());
                    setTimeout(_ => this.showCarousel = true);
                });
        } else {
            this.showCarousel = true;
            this.numberOfSlides = this.deviceCouldChanged(TypeOfResolution.DESKTOP);
        }
    }
}
