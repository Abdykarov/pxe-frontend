import {
    Directive,
    ElementRef,
    OnInit,
} from '@angular/core';

@Directive({
    selector: '[lndDisplayNoneOnFirefox]',
})
export class DisplayNoneOnFirefoxDirective {

    constructor(
        private el: ElementRef,
    ) {

        if (navigator.userAgent.indexOf('Firefox') !== -1) {
            this.el.nativeElement.style.display = 'none';
        }
    }
}
