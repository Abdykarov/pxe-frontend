import { isPlatformBrowser } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Inject,
    Input, OnInit,
    PLATFORM_ID,
    Renderer2,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import * as R from 'ramda';
import { fromEvent } from 'rxjs';
import { debounceTime, map, takeUntil } from 'rxjs/operators';
import { AbstractComponent } from 'src/common/abstract.component';
// Own models
import { ITooltipDirection } from './models/direction.model';

const TOOLTIP_WRAPPER = '.tooltip .tooltip__content';
const PAGE_PADDING = 8;

@Component({
    selector: 'lnd-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent extends AbstractComponent implements OnInit, AfterViewInit {
    @ViewChild('contentWrapperDiv')
    public contentWrapperDiv: ElementRef;

    @Input()
    public actionTemplate?: TemplateRef<any>;

    @Input()
    public customClass?: string;

    @Input()
    public direction?: ITooltipDirection;

    @Input()
    public countPositionByElement = null;

    public startDirection = null;

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
                this.manageDropdownPosition();
                this.isOpen = false;
            });
    }

    public toggle = () => {
        if (this.allowClick) {
            this.isOpen = !this.isOpen;
            if (this.isOpen) {
                setTimeout(() => {
                    this.manageDropdownPosition();
                });
            }
        }
    }

    public manageDropdownPosition() {
        if (this.countPositionByElement && isPlatformBrowser(this.platformId)) {
            this.direction = this.startDirection;
            const tooltipContent = this.countPositionByElement.querySelector(TOOLTIP_WRAPPER);
            this.renderer.removeStyle(tooltipContent, 'right');
            this.renderer.removeStyle(tooltipContent, 'left');
            this.renderer.removeStyle(tooltipContent, 'transform');
            const clientHeight = document.body.clientHeight;
            const wrapperRect = this.countPositionByElement.getBoundingClientRect();
            let tooltipContentRect = tooltipContent.getBoundingClientRect();

            const differenceTooltipAndWrapperLeft = tooltipContentRect.left - wrapperRect.left;
            const needLeftShift = differenceTooltipAndWrapperLeft <= PAGE_PADDING;
            const differenceTooltipAndWrapperRight = tooltipContentRect.right - wrapperRect.right;
            const needRightShift = differenceTooltipAndWrapperRight >= PAGE_PADDING;

            const isDownAvailable =
                document.documentElement.clientHeight - this.hostElement.nativeElement.getBoundingClientRect().bottom - 15
                > tooltipContentRect.height;

            if (!isDownAvailable) {
                this.direction = ITooltipDirection.TOP;
            }

            if (needLeftShift) {
                this.renderer.setStyle(tooltipContent, 'transform', 'translateX(0%)');
                this.renderer.setStyle(tooltipContent, 'left', '0px');
                tooltipContentRect = tooltipContent.getBoundingClientRect();
                const diff = tooltipContentRect.left - wrapperRect.left;
                this.renderer.setStyle(
                    tooltipContent,
                    'left',
                    -(diff - PAGE_PADDING) + 'px',
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
                    -(diff + PAGE_PADDING) + 'px',
                );
            }
        }
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.manageDropdownPosition();
        });
    }

    ngOnInit () {
        super.ngOnInit();
        this.startDirection = this.direction;
    }

}
