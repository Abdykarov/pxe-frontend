import {
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    NgZone,
    OnInit,
    Output,
} from '@angular/core';

import {
    debounceTime,
    takeUntil,
} from 'rxjs/operators';
import {
    fromEvent,
} from 'rxjs';

import { AbstractComponent } from '../../abstract.component';
import { getAbsoluteHeightOfElementFnc } from '../../utils';

@Directive({
    selector: '[lndFirstTimeInView]',
})
export class FirstTimeInViewDirective extends AbstractComponent implements OnInit {

    @Input()
    public debounceTime = 100;

    @Output()
    public firstTimeInViewAction: EventEmitter<any> = new EventEmitter<any>();

    private readonly nativeElement = null;

    private scrollEvent$ = fromEvent(window, 'scroll')
        .pipe(
            debounceTime(this.debounceTime),
        );

    constructor(
        private el: ElementRef,
        private ngZone: NgZone,
    ) {
        super();
        this.nativeElement = el.nativeElement;
    }

    ngOnInit() {
        this.ngZone.runOutsideAngular(() => {
            const scrollEvent =
                this.scrollEvent$
                    .pipe(takeUntil(this.destroy$))
                    .subscribe(() => {
                        const hT = this.nativeElement.offsetTop;
                        const hH = getAbsoluteHeightOfElementFnc(this.nativeElement);
                        const wH = window.innerHeight;
                        const wS = window.scrollY ||
                            window.pageYOffset ||
                            document.body.scrollTop + (document.documentElement && document.documentElement.scrollTop || 0);

                        if (wS > (hT + hH - wH)) {
                            this.firstTimeInViewAction.emit();
                            scrollEvent.unsubscribe();
                        }
                    });
        });
    }
}
