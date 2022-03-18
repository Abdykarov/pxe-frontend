import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    Renderer2,
    TemplateRef,
} from '@angular/core';
import * as R from 'ramda';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
// Own models
import { IDropdownDirection } from './models/direction.model';

const DROPDOWN_MENU_SELECTOR = '.dropdown-menu';
const PAGE_PADDING = 30;

@Component({
    selector: 'lnd-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {
    @Input()
    public actionTemplate?: TemplateRef<any>;

    @Input()
    public contentTemplate?: TemplateRef<any>;

    @Input()
    public customDropdownClass?: string;

    @Input()
    public direction?: IDropdownDirection;

    @Input()
    public hasBeak = false;

    @Input()
    public closeOnClick = true;

    @Input()
    public menuDirection?: IDropdownDirection;

    @Input()
    public overlayEnabled?: boolean;

    @Output()
    public toggleOverlayerAction: EventEmitter<any> = new EventEmitter<any>();

    private _isOpen: boolean;

    set isOpen(open: boolean) {
        this._isOpen = open;
        this.toggleOverlayerAction.emit(open);
        if (this._isOpen) {
            this.openedDropdown = this.hostElement.nativeElement;
            setTimeout(() => this.manageDropdownPosition(), 0);
        } else {
            this.openedDropdown = {};
        }
    }

    get isOpen(): boolean {
        return this._isOpen;
    }

    private openedDropdown: any = {};

    private originalDirection?: IDropdownDirection;

    ngOnInit() {
        this.originalDirection = this.direction;
    }

    constructor(private hostElement: ElementRef, private renderer: Renderer2) {
        this.direction = R.contains(
            this.direction,
            Object.values(IDropdownDirection)
        )
            ? this.direction
            : IDropdownDirection.DOWN;

        const resizeEvent$ = fromEvent(window, 'resize').pipe(
            debounceTime(200)
        );
        resizeEvent$.subscribe(() => this.manageDropdownPosition());
    }

    public toggle = () => {
        this.isOpen = !this.isOpen;
    };

    public itemClick = () => {
        if (this.closeOnClick) {
            this.isOpen = false;
        }
    };

    public manageDropdownPosition() {
        if (R.isEmpty(this.openedDropdown)) {
            return;
        }
        const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;
        const clientWidth = document.body.clientWidth;
        const clientHeight = document.body.clientHeight;
        const wrapper = this.openedDropdown;
        const dropdownMenu = wrapper.querySelector(DROPDOWN_MENU_SELECTOR);
        let left;

        this.renderer.removeStyle(dropdownMenu, 'left');
        this.renderer.removeStyle(dropdownMenu, 'right');

        const wrapperRect = wrapper.getBoundingClientRect();
        let dropdownMenuRect = dropdownMenu.getBoundingClientRect();

        const isDownAvailable =
            scrollTop +
                dropdownMenuRect.height +
                wrapperRect.bottom +
                PAGE_PADDING <
            clientHeight;
        const isUpAvailable =
            dropdownMenuRect.height + 2 * PAGE_PADDING < wrapperRect.bottom;

        this.direction = this.originalDirection;

        if (dropdownMenuRect.width + PAGE_PADDING === clientWidth) {
            return;
        }

        switch (this.originalDirection) {
            case IDropdownDirection.DOWN:
                {
                    if (!isDownAvailable && isUpAvailable) {
                        this.direction = IDropdownDirection.UP;
                    }
                }
                break;
            case IDropdownDirection.UP: {
                if (isDownAvailable && !isUpAvailable) {
                    this.direction = IDropdownDirection.DOWN;
                }
                break;
            }
        }

        switch (this.menuDirection) {
            case IDropdownDirection.CENTER: {
                left = (wrapperRect.width - dropdownMenuRect.width) / 2;
                this.renderer.setStyle(dropdownMenu, 'left', left + 'px');
                dropdownMenuRect = dropdownMenu.getBoundingClientRect();
                break;
            }
            case IDropdownDirection.RIGHT: {
                if (dropdownMenuRect.left < 0) {
                    this.renderer.setStyle(dropdownMenu, 'right', 'auto');
                }
                break;
            }
        }

        if (dropdownMenuRect.left < 0) {
            this.renderer.setStyle(dropdownMenu, 'left', 0 + 'px');
        }
        if (dropdownMenuRect.right > clientWidth - PAGE_PADDING) {
            left = -1 * (dropdownMenuRect.width - wrapperRect.width);
            this.renderer.setStyle(dropdownMenu, 'left', left + 'px');
        }
    }
}
