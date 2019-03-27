import {
    Component,
    Input,
    TemplateRef,
} from '@angular/core';
import * as R from 'ramda';
import { debounceTime } from 'rxjs/operators';
import { fromEvent } from 'rxjs';

// Own models
import { ITooltipDirection } from './models/direction.model';

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

    public isOpen: boolean;

    private mq = window.matchMedia('(max-width: 992px)');
    private allowClick = true;
    private resizeEvent$ = fromEvent(window, 'resize')
        .pipe(
            debounceTime(200),
        );

    constructor() {
        this.direction = R.contains(this.direction, Object.values(ITooltipDirection)) ? this.direction : ITooltipDirection.LEFT;
        this.allowClick = this.mq.matches;
        this.resizeEvent$.subscribe(() => {
            this.isOpen = false;
            this.allowClick = this.mq.matches;
        });
    }

    public toggle = () => {
        if (this.allowClick) {
            this.isOpen = !this.isOpen;
        }
    }
}
