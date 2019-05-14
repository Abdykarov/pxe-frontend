import {
    Directive,
    ElementRef,
    OnDestroy,
} from '@angular/core';
import * as textMask from 'vanilla-text-mask/dist/vanillaTextMask.js';

@Directive({
    selector: '[lndDatepickerDirective]',
})
export class MaskDateDirective implements OnDestroy {
    mask = [/\d/, /\d/, '.', /[01]/, /[123456789]/, '.', /\d/, /\d/, /\d/, /\d/]; // dd.mm.yyyy
    maskedInputController;

    constructor(private element: ElementRef) {
        this.maskedInputController = textMask.maskInput({
            inputElement: this.element.nativeElement,
            mask: this.dateMask,
            // placeholderChar: '\u2000',
        });
    }

    dateMask = (aa) => {
        console.log(aa);
        return this.mask;
    }

    getDaysInMonth = (month: number, year: number): number => {
        console.log('OK');
        return new Date(year, month, 0).getDate();
    }

    ngOnDestroy() {
        this.maskedInputController.destroy();
    }
}
