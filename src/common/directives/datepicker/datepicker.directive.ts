import { Directive, ElementRef, OnDestroy } from '@angular/core';
import * as textMask from 'vanilla-text-mask/dist/vanillaTextMask.js';

@Directive({
    selector: '[lndDatepickerDirective]',
})
export class MaskDateDirective implements OnDestroy {
    mask = [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/]; // dd.mm.yyyy
    maskedInputController;

    constructor(private element: ElementRef) {
        this.maskedInputController = textMask.maskInput({
            inputElement: this.element.nativeElement,
            mask: this.mask,
            // placeholderChar: '\u2000',
        });
    }

    ngOnDestroy() {
        this.maskedInputController.destroy();
    }
}
