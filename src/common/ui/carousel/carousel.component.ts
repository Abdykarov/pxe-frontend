import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewEncapsulation,
} from '@angular/core';

import { ICarouselItem } from 'src/common/ui/carousel/models/data.model';

@Component({
    selector: 'lnd-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CarouselComponent {

    @Input()
    public interval: boolean | number = false;

    @Input()
    public carouselItems: ICarouselItem[];


    constructor(
        private cd: ChangeDetectorRef,
    ) {
        setInterval(() => {
            this.cd.markForCheck();
        }, 100);
    }
}
