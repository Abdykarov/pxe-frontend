import {
    Component,
    Inject,
    PLATFORM_ID,
    ViewEncapsulation,
} from '@angular/core';

import { AbstractResizeComponent } from 'src/common/abstract-resize.component';
import { ISupplierCompare } from 'src/common/containers/carousels-container/models/models';
import { mapTypeOfDeviceToNumberOfSlides } from './carousel-compare.config';
import { TypeOfResolution } from 'src/common/models/type-of-resolution';

@Component({
    selector: 'pxe-carousel-compare',
    styleUrls: ['carousel-compare.component.scss'],
    templateUrl: './carousel-compare.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class CarouselCompareComponent extends AbstractResizeComponent {

    public numberOfSlides = null;

    public config: ISupplierCompare[] = [
        {
            region: 'Středočeský kraj',
            saving: 1000,
        },
        {
            region: 'Hlavní město Praha',
            saving: 2000,
        },
        {
            region: 'Jihočeský kraj',
            saving: 30000,
        },
        {
            region: 'Jihomoravský kraj',
            saving: 40000,
        },
        {
            region: 'Karlovarský kraj',
            saving: 50000,
        },
        {
            region: 'Královéhradecký kraj',
            saving: 60000,
        },
        {
            region: 'Liberecký kraj',
            saving: 70000,
        },
        {
            region: 'Moravskoslezský kraj',
            saving: 80000,
        },
        {
            region: 'Olomoucký kraj',
            saving: 90000,
        },
    ];

    public maxHeight = 0;
    public rerender = false;

    public deviceCouldChanged = (typeOfResolution: TypeOfResolution) =>
        this.numberOfSlides = mapTypeOfDeviceToNumberOfSlides[typeOfResolution]


    constructor(
        @Inject(PLATFORM_ID) private platformId: string,
    ) {
        super();
        this.deviceCouldChanged(this.getTypeOfDevice());
    }

    public maxHeightChangeAction = (maxHeight: number) => this.maxHeight = maxHeight;
}
