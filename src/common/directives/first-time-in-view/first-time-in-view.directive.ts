import {
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    NgZone,
    OnInit,
    Output,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { AbstractComponent } from 'src/common/abstract.component';
import { getAbsoluteHeightOfElementFnc } from 'src/common/utils';

@Directive({
    selector: '[lndFirstTimeInView]',
})
export class FirstTimeInViewDirective
    extends AbstractComponent
    implements OnInit
{
    @Input()
    public debounceTime = 100;

    @Output()
    public firstTimeInViewAction: EventEmitter<any> = new EventEmitter<any>();

    private readonly nativeElement = null;

    private scrollEvent$ = fromEvent(window, 'scroll').pipe(
        debounceTime(this.debounceTime)
    );

    constructor(private el: ElementRef, private ngZone: NgZone) {
        super();
        this.nativeElement = el.nativeElement;
    }

    ngOnInit() {
        this.ngZone.runOutsideAngular(() => {
            const scrollEvent = this.scrollEvent$
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    const elementOffsetTop = this.nativeElement.offsetTop;
                    const elementHeight = getAbsoluteHeightOfElementFnc(
                        this.nativeElement
                    );
                    const pageHeight = window.innerHeight;
                    const pageYOffset =
                        window.scrollY ||
                        window.pageYOffset ||
                        document.body.scrollTop +
                            ((document.documentElement &&
                                document.documentElement.scrollTop) ||
                                0);

                    if (
                        pageYOffset >
                        elementOffsetTop + elementHeight - pageHeight
                    ) {
                        this.firstTimeInViewAction.emit();
                        scrollEvent.unsubscribe();
                    }
                });
        });
    }
}
