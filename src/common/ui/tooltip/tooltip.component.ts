import {
    Component, ElementRef,
    Input, Renderer2,
    TemplateRef,
} from '@angular/core';
import * as R from 'ramda';
import { count, debounceTime } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

// Own models
import { ITooltipDirection } from './models/direction.model';

const TOOLTIP_WRAPPER = '.tooltip .tooltip__content';
const PAGE_PADDING = 30;

@Component({
    selector: 'lnd-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent {
    @Input()
    public actionTemplate?: TemplateRef<any>;

    @Input()
    public customClass?: string;

    @Input()
    public direction?: ITooltipDirection;

    @Input()
    public countPositionBy = null;

    public isOpen: boolean;

    private mq = window.matchMedia('(max-width: 992px)');
    private allowClick = true;
    private resizeEvent$ = fromEvent(window, 'resize')
        .pipe(
            debounceTime(200),
        );

    constructor(
        private hostElement: ElementRef,
        private renderer: Renderer2,
    ) {
        this.direction = R.contains(this.direction, Object.values(ITooltipDirection)) ? this.direction : ITooltipDirection.LEFT;
        this.allowClick = this.mq.matches;
        this.resizeEvent$.subscribe(() => {
            this.manageDropdownPosition();
            this.isOpen = false;
            this.allowClick = this.mq.matches;
        });
    }

    public toggle = () => {
        if (this.allowClick) {
            this.isOpen = !this.isOpen;
        }
    }

    public manageDropdownPosition() {
        const wrapper = this.countPositionBy;
        const tooltipContent = wrapper.querySelector(TOOLTIP_WRAPPER);
        const wrapperRect = wrapper.getBoundingClientRect();
        const tooltipContentRect = tooltipContent.getBoundingClientRect();
        let left = 0;
        if (wrapperRect.left - tooltipContentRect.left) {
            console.log(wrapperRect.left);
            console.log(tooltipContentRect.left);
            left = wrapperRect.left - tooltipContentRect.left;
            console.log(left);
            // this.renderer.setStyle(tooltipContent, 'left', wrapperRect.left + 'px');
        }
        // tooltipContent.
        // console.log(tooltipContentRect);
        // console.log(wrapperRect);
        // console.log(wrapperRect.left);
        // console.log(tooltipContentRect.left);
        // console.log(wrapperRect.left - tooltipContentRect.left);


        // const clientWidth = document.body.clientWidth;
        // const clientHeight = document.body.clientHeight;
        // const banan = this.countPositionBy.nativeElement;
        // const wrapper = this.hostElement.nativeElement;
        // const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        // const troll = wrapper.querySelector(TOOLTIP_WRAPPER);

//         const dropdownMenu = wrapper.querySelector(TOOLTIP_WRAPPER);
//         console.log('_Asdasdads_');
//         console.log(dropdownMenu);
//         let left;
// console.log(wrapper);
        // wrapper.className = '';
        // troll.className = '';
        // this.renderer.removeStyle(dropdownMenu, 'right');
        // this.renderer.removeStyle(dropdownMenu, 'left');

        // const wrapperRect = wrapper.getBoundingClientRect();
        // let dropdownMenuRect = dropdownMenu.getBoundingClientRect();
        //
        // const isDownAvailable = scrollTop + dropdownMenuRect.height + wrapperRect.bottom + PAGE_PADDING < clientHeight;
        // const isUpAvailable = dropdownMenuRect.height + 2 * PAGE_PADDING < wrapperRect.bottom;
        //
        // if (dropdownMenuRect.width + PAGE_PADDING === clientWidth) {
        //     return;
        // }


        // left = (wrapperRect.width - dropdownMenuRect.width) / 2;
        // this.renderer.setStyle(dropdownMenu, 'left', left + 'px');
        // dropdownMenuRect = dropdownMenu.getBoundingClientRect();

        // console.log(dropdownMenuRect.left);
        // console.log(left);
        // console.log('___');
        //
        // if (dropdownMenuRect.left < 0) {
        //     this.renderer.setStyle(dropdownMenu, 'left', 0 + 'px');
        // }
        // if (dropdownMenuRect.right > clientWidth - PAGE_PADDING) {
        //     left = -1 * (dropdownMenuRect.width - wrapperRect.width);
        //     this.renderer.setStyle(dropdownMenu, 'left', left + 'px');
        // }
    }
}
