import {
    fromEvent,
    Subscription,
} from 'rxjs';
import { filter } from 'rxjs/operators';

import {
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
} from '@angular/core';

@Directive({
    selector: '[lndOffClick]',
})
export class OffClickDirective implements OnDestroy {

    @Input()
    offClickEnabled = true;

    @Output()
    lndOffClick: EventEmitter<Event> = new EventEmitter<Event>();

    private subscription$: Subscription;
    readonly documentBodyElement: HTMLElement;
    readonly baseElement: HTMLElement;

    constructor(
        private el: ElementRef,
    ) {
        this.baseElement = this.el.nativeElement;
        this.documentBodyElement = document.body;
        this.subscription$ = fromEvent(document, 'mousedown')
            .pipe(
                filter(() => this.offClickEnabled),
            )
            .subscribe((event: Event) => this.clickHandler(event.target, event));
    }

    private clickHandler(currentElement: any, event: Event): void {
        if (currentElement === this.documentBodyElement || currentElement == null) {
            this.lndOffClick.emit(event);
            return;
        }

        if (currentElement === this.baseElement) {
            return;
        }

        this.clickHandler(currentElement.parentElement, event);
    }

    ngOnDestroy() {
        this.subscription$.unsubscribe();
    }
}
