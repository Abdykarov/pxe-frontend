import { isPlatformBrowser } from '@angular/common';
import {
    ChangeDetectorRef,
    Component,
    Inject,
    Input,
    PLATFORM_ID,
    ViewEncapsulation,
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { AbstractResizeComponent } from 'src/common/abstract-resize.component';
import { CommodityType } from 'src/common/graphql/models/supply.model';
import { TypeOfResolution } from 'src/common/models/type-of-resolution';
import {
    mapTypeOfDeviceToNumberOfSlides,
    supplierCompares,
} from './carousel-compare.config';

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

    public deviceCouldBeChanged = (typeOfResolution: TypeOfResolution) =>
        (this.numberOfSlides =
            mapTypeOfDeviceToNumberOfSlides[typeOfResolution]);

    constructor(
        private cd: ChangeDetectorRef,
        @Inject(PLATFORM_ID) private platformId: string
    ) {
        super();

        if (isPlatformBrowser(this.platformId)) {
            this.deviceCouldBeChanged(this.getTypeOfDevice());

            this.resizeEvent$.pipe(takeUntil(this.destroy$)).subscribe(() => {
                this.showCarousel = false;
                this.numberOfSlides = this.deviceCouldBeChanged(
                    this.getTypeOfDevice()
                );
                setTimeout((_) => {
                    this.showCarousel = true;
                    this.cd.markForCheck();
                });
            });
        } else {
            this.showCarousel = true;
            this.numberOfSlides = this.deviceCouldBeChanged(
                TypeOfResolution.DESKTOP
            );
            this.cd.markForCheck();
        }
    }

    public maxHeightChangeAction = (maxHeight: number) =>
        (this.maxHeight = maxHeight);
}
