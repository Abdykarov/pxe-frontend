import { isPlatformBrowser } from '@angular/common';
import {
    Component,
    EventEmitter,
    Inject,
    Input,
    OnInit,
    Output,
    PLATFORM_ID,
    TemplateRef,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import * as R from 'ramda';
import { takeUntil } from 'rxjs/operators';
import { AbstractResizeComponent } from 'src/common/abstract-resize.component';
import { TypeOfResolution } from 'src/common/models/type-of-resolution';
import { IDefaultCarouselItem } from 'src/common/ui/carousel/models/data.model';
import { getHeightOfDisplayNoneElement } from 'src/common/utils';

@Component({
    selector: 'lnd-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CarouselComponent
    extends AbstractResizeComponent
    implements OnInit
{
    public readonly ADDING_HEIGHT_SLIDE = 40;

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
    public noWrap = false;

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

    @Input()
    public withCountHeight = true;

    @Output()
    public deviceCouldChangedAction: EventEmitter<TypeOfResolution> = new EventEmitter<TypeOfResolution>();

    @Output()
    public activeSlideChangeAction: EventEmitter<number> = new EventEmitter<number>();

    @Output()
    public slideRangeChangeAction: EventEmitter<number[]> = new EventEmitter<
        number[]
    >();

    @Output()
    public maxHeightChangeAction: EventEmitter<number> = new EventEmitter<number>();

    public activeSlide = 0;
    public activeSlideRange = [];

    private innerCarousel: HTMLDivElement = null;
    private maxHeightSlide = null;
    private slides: Node[] = null;

    public setActiveSlide = (index: number) => (this.activeSlide = index);

    setPause(): void {
        this.carousel.noPause = false;
        this.carousel.pause();
    }

    constructor(@Inject(PLATFORM_ID) private platformId: string) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        if (isPlatformBrowser(this.platformId)) {
            if (this.withCountHeight) {
                setTimeout(() => {
                    const parentElement = this.parent.nativeElement;
                    this.slides = parentElement.getElementsByTagName('slide');
                    this.innerCarousel = R.pipe(
                        R.head,
                        R.prop('parentElement'),
                        R.prop('parentElement')
                    )(parentElement.getElementsByTagName('slide'));
                    this.setHeights();

                    this.resizeEvent$
                        .pipe(takeUntil(this.destroy$))
                        .subscribe(() => {
                            this.setHeights();
                        });
                });
            }
        }
    }

    private getMaxHeightSlide = (): number =>
        R.reduce(
            (acc, element) =>
                R.max(acc, getHeightOfDisplayNoneElement(element)),
            -Infinity,
            this.slides
        );

    public setHeights = (): void => {
        this.innerCarousel.style.height = '';
        this.maxHeightSlide = this.getMaxHeightSlide();
        this.innerCarousel.style.height =
            this.maxHeightSlide + this.ADDING_HEIGHT_SLIDE + 'px';
        this.maxHeightChangeAction.emit(this.maxHeightSlide);
    };
}
