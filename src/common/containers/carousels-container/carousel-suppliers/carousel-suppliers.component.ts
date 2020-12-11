import {
    Component,
    ViewEncapsulation,
} from '@angular/core';

import { AbstractResizeComponent } from 'src/common/abstract-resize.component';
import { ISupplierLogo } from 'src/common/containers/carousels-container/models/models';
import { TypeOfResolution } from 'src/common/models/type-of-resolution';
import { mapTypeOfDeviceToNumberOfSlides } from './carousel-suppliers.config';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'pxe-carousel-suppliers',
    styleUrls: ['carousel-suppliers.component.scss'],
    templateUrl: './carousel-suppliers.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class CarouselSuppliersComponent extends AbstractResizeComponent {
    public readonly height = 35;

    public numberOfSlides = null;

    public config: ISupplierLogo[] = [
        {
            alt: 'logo - Alpiq CZ',
            logoUrl: '/assets/images/suppliers/logo_alpiq-hover.svg',
            title: 'Alpiq CZ',
        },
        {
            alt: 'logo - Bohemia Energy entity s.r.o.',
            logoUrl: '/assets/images/suppliers/logo_bohemia-energy-hover.svg',
            title: 'Bohemia Energy entity s.r.o.',
        },
        {
            alt: 'logo - EP Energy Trading a.s.',
            logoUrl: '/assets/images/suppliers/logo_ep-energy-trading-hover.svg',
            title: 'EP Energy Trading a.s.',
        },
        {
            alt: 'logo - Yello Energy',
            logoUrl: '/assets/images/suppliers/logo_yello-energy-hover.svg',
            title: 'Yello Energy',
        },
        {
            alt: 'logo - CARBOUNION BOHEMIA, spol. s r. o.',
            logoUrl: '/assets/images/suppliers/logo_carbounion-bohemia@2x-hover.png',
            title: 'CARBOUNION BOHEMIA, spol. s r. o.',
        },
        {
            alt: 'logo - Pražská plynárenská a.s.',
            logoUrl: '/assets/images/suppliers/logo_prazska-plynarenska-hover.svg',
            title: 'Pražská plynárenská a.s.',
        },
    ];

    public deviceCouldChanged = (typeOfResolution: TypeOfResolution) =>
        this.numberOfSlides = mapTypeOfDeviceToNumberOfSlides[typeOfResolution]

    constructor() {
        super();
        this.deviceCouldChanged(this.getTypeOfDevice());

        this.resizeEvent$
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.showCarousel = false;
                this.numberOfSlides = this.deviceCouldChanged(this.getTypeOfDevice());
                setTimeout(_ => this.showCarousel = true);
            });
    }
}
