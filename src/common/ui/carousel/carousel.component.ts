import {
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';

import { ICarouselItem } from 'src/common/ui/carousel/models/data.model';

@Component({
    selector: 'lnd-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {

    @Input()
    public interval: boolean | number = false;

    @Input()
    public carouselItems: ICarouselItem[];

    @Output()
    public activeSlideChange: EventEmitter<any> = new EventEmitter<any>();

}
