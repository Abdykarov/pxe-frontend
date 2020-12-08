import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';

import * as R from 'ramda';
import { fromEvent } from 'rxjs';
import {
    debounceTime,
    takeUntil,
} from 'rxjs/operators';

import { AbstractComponent } from 'src/common/abstract.component';
import { getHeightOfDisplayNoneElement } from 'src/common/utils';
import { IDefaultCarouselItem } from 'src/common/ui/carousel/models/data.model';

@Component({
    selector: 'lnd-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CarouselComponent extends AbstractComponent implements OnInit {

    @ViewChild('carousel', { static: true }) carousel: any;

    @ViewChild('parent', { static: true }) parent: any;

    @Input()
    public carouselItems: IDefaultCarouselItem[];

    @Input()
    public customAfterAppendTemplate?: TemplateRef<any>;

    @Input()
    public customBeforeAppendTemplate?: TemplateRef<any>;

    @Input()
    public customSlideWrapper = '';

    @Input()
    public interval: boolean | number = false;

    @Input()
    public itemsPerSlide = 1;

    @Input()
    public showIndicators = true;

    @Input()
    public singleSlideOffset = true;

    @Input()
    public showLeftAndRightIndicators = true;

    @Input()
    public slideTemplate: TemplateRef<any>;

    @Output()
    public activeSlideChange: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public maxHeightChange: EventEmitter<any> = new EventEmitter<number>();

    public activeSlide = 0;

    private innerCarousel: HTMLDivElement = null;
    private maxHeightSlide = null;
    private maxHeightOfCarousel = null;
    private slides: Node[] = null;

    public resizeEvent$ = fromEvent(window, 'resize')
        .pipe(
            takeUntil(this.destroy$),
            debounceTime(200),
        );

    public setActiveSlide = (index: number) => this.activeSlide = index;

    setPause(): void {
        this.carousel.noPause = false;
        this.carousel.pause();
    }

    ngOnInit() {
        super.ngOnInit();
        setTimeout(_ => {
            const parentElement = this.parent.nativeElement;
            this.slides = parentElement.getElementsByTagName('slide');
            this.innerCarousel = R.pipe(
                R.head,
                R.prop('parentElement'),
                R.prop('parentElement'),
            )(parentElement.getElementsByTagName('slide'));
            this.setHeights();

            this.resizeEvent$
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    this.setHeights();
                });
        });

    }

    private getMaxHeightSlide = (): number =>
        R.reduce((acc, element) => R.max(acc, getHeightOfDisplayNoneElement(element)), -Infinity, this.slides)

    private getHeightOfCarousel = (): number =>
         R.reduce((acc, element) => R.max(acc, getHeightOfDisplayNoneElement(element, this.innerCarousel, true)), -Infinity, this.slides)

    public setHeights = (): void => {
        this.innerCarousel.style.height = '';
        this.maxHeightSlide = this.getMaxHeightSlide();
        this.innerCarousel.style.height = (this.maxHeightSlide) + 'px';
        this.maxHeightChange.emit(this.maxHeightSlide);
    }
}
