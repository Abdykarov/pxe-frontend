import {
    ChangeDetectorRef,
    Component,
    ElementRef,
    Inject,
    Input,
    PLATFORM_ID,
    Renderer2,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import * as R from 'ramda';
import {
    debounceTime,
    takeUntil,
} from 'rxjs/operators';
import { fromEvent } from 'rxjs';

import { AbstractComponent } from 'src/common/abstract.component';
import { ITooltipDirection } from './models/direction.model';

@Component({
    selector: 'lnd-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent extends AbstractComponent {
    private readonly INNER_PADDING_FOR_COUNT = 8;

    @ViewChild('contentWrapperDiv')
    public contentWrapperDiv: ElementRef;

    @Input()
    public actionTemplate?: TemplateRef<any>;

    @Input()
    public customClass?: string;

    @Input()
    public customContentClass?: string;

    @Input()
    public direction?: ITooltipDirection;

    @Input()
    public wrapperElement = null;

    public isOpen: boolean;

    private allowClick = true;
    private resizeEvent$ = fromEvent(window, 'resize')
        .pipe(
            debounceTime(200),
        );

    constructor(
        private cd: ChangeDetectorRef,
        private hostElement: ElementRef,
        private renderer: Renderer2,
        @Inject(PLATFORM_ID) private platformId: string,
    ) {
        super();
        this.direction = R.contains(this.direction, Object.values(ITooltipDirection)) ? this.direction : ITooltipDirection.LEFT;
        this.resizeEvent$
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this.isOpen = false;
                this.cd.markForCheck();
            });
    }

    public toggle = () => {
        if (this.allowClick) {
            this.isOpen = !this.isOpen;
            if (this.isOpen) {
                setTimeout(() => {
                    this.manageTooltipPosition();
                });
            }
        }
    }

    public manageTooltipPosition() {
        if (this.wrapperElement && isPlatformBrowser(this.platformId) && this.isOpen) {
            if (this.direction !== ITooltipDirection.BOTTOM) {
                this.direction = ITooltipDirection.BOTTOM;
                this.cd.markForCheck();
            }

            const tooltipContent = this.contentWrapperDiv.nativeElement;

            setTimeout(() => {
                this.renderer.removeStyle(tooltipContent, 'right');
                this.renderer.removeStyle(tooltipContent, 'left');
                this.renderer.removeStyle(tooltipContent, 'transform');
                const wrapperRect = this.wrapperElement.getBoundingClientRect();
                let tooltipContentRect = tooltipContent.getBoundingClientRect();

                const differenceTooltipAndWrapperLeft = tooltipContentRect.left - wrapperRect.left;
                const needLeftShift = differenceTooltipAndWrapperLeft <= this.INNER_PADDING_FOR_COUNT;
                const differenceTooltipAndWrapperRight = tooltipContentRect.right - wrapperRect.right;
                const needRightShift = differenceTooltipAndWrapperRight >= this.INNER_PADDING_FOR_COUNT;

                const isDownAvailable = tooltipContentRect.bottom + this.INNER_PADDING_FOR_COUNT < document.documentElement.clientHeight;

                if (isDownAvailable) {
                    this.direction = ITooltipDirection.BOTTOM;
                } else {
                    this.direction = ITooltipDirection.TOP;
                }

                this.cd.markForCheck();

                if (needLeftShift) {
                    this.renderer.setStyle(tooltipContent, 'transform', 'translateX(0%)');
                    this.renderer.setStyle(tooltipContent, 'left', '0px');
                    tooltipContentRect = tooltipContent.getBoundingClientRect();
                    const diff = tooltipContentRect.left - wrapperRect.left;
                    this.renderer.setStyle(
                        tooltipContent,
                        'left',
                        -(diff - this.INNER_PADDING_FOR_COUNT) + 'px',
                    );
                }

                if (needRightShift) {
                    this.renderer.setStyle(tooltipContent, 'transform', 'translateX(0%)');
                    this.renderer.setStyle(tooltipContent, 'left', '0px');
                    tooltipContentRect = tooltipContent.getBoundingClientRect();
                    const diff = tooltipContentRect.right - wrapperRect.right;
                    this.renderer.setStyle(
                        tooltipContent,
                        'left',
                        -(diff + this.INNER_PADDING_FOR_COUNT) + 'px',
                    );
                }
            });
        }
    }
}
