import {
    Component,
    EventEmitter,
    Input,
    Output,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';

import { AbstractComponent } from 'src/common/abstract.component';
import { IDefaultCarouselItem } from 'src/common/ui/carousel/models/data.model';

@Component({
    selector: 'lnd-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CarouselComponent extends AbstractComponent {

    @ViewChild('carousel', { static: true }) carousel: any;

    @Input()
    public carouselItems: IDefaultCarouselItem[];

    @Input()
    public customIndicatorsTemplate?: TemplateRef<any>;

    @Input()
    public interval: boolean | number = false;

    @Input()
    public showIndicators = true;

    @Input()
    public showLeftAndRightIndicators = true;

    @Input()
    public slideTemplate: TemplateRef<any>;

    @Output()
    public activeSlideChange: EventEmitter<any> = new EventEmitter<any>();

    public activeSlide = 0;

    public setActiveSlide = (index: number) => this.activeSlide = index;

    setPause(): void {
        this.carousel.noPause = false;
        this.carousel.pause();
    }
}
