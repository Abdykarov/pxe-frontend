import {
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';

import { AbstractComponent } from 'src/common/abstract.component';
import { ICarouselItem } from 'src/common/ui/carousel/models/data.model';

@Component({
    selector: 'lnd-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CarouselComponent extends AbstractComponent {

    @Input()
    public interval: boolean | number = false;

    @Input()
    public carouselItems: ICarouselItem[];

    @Output()
    public activeSlideChange: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('carousel', { static: true }) carousel: any;

    setPause(): void {
        this.carousel.noPause = false;
        this.carousel.pause();
    }
}
