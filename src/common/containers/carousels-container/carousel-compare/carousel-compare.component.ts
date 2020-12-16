import {
    ChangeDetectorRef,
    Component,
    Input,
    ViewEncapsulation,
} from '@angular/core';

import { takeUntil } from 'rxjs/operators';

import { AbstractResizeComponent } from 'src/common/abstract-resize.component';
import { CommodityType } from 'src/common/graphql/models/supply.model';
import { mapTypeOfDeviceToNumberOfSlides } from './carousel-compare.config';
import { supplierCompares } from './carousel-compare.config';
import { TypeOfResolution } from 'src/common/models/type-of-resolution';

@Component({
    selector: 'pxe-carousel-compare',
    styleUrls: ['carousel-compare.component.scss'],
    templateUrl: './carousel-compare.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class CarouselCompareComponent extends AbstractResizeComponent {

    public numberOfSlides = null;

    @Input()
    public commodityType = CommodityType.POWER;
    public CommodityType = CommodityType;

    public supplierCompares = supplierCompares;

    public maxHeight = 0;

    public deviceCouldChanged = (typeOfResolution: TypeOfResolution) =>
        this.numberOfSlides = mapTypeOfDeviceToNumberOfSlides[typeOfResolution]


    constructor(
        private cd: ChangeDetectorRef,
    ) {
        super();
        this.deviceCouldChanged(this.getTypeOfDevice());

        this.resizeEvent$
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.showCarousel = false;
                this.numberOfSlides = this.deviceCouldChanged(this.getTypeOfDevice());
                setTimeout(_ => {
                    this.showCarousel = true;
                    this.cd.markForCheck();
                });
            });
    }

    public maxHeightChangeAction = (maxHeight: number) => this.maxHeight = maxHeight;
}
