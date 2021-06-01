import {
    AfterViewInit,
    Directive,
    ElementRef,
    Input,
    OnChanges, OnInit,
    Renderer2,
} from '@angular/core';

import * as searchHelper from './search-helper';
import { decode } from 'html-entities';

// base on https://github.com/ng-select/ng-select/tree/master/src/ng-option-highlight
@Directive({
    selector: '[lndOptionHighlight]',
})
export class OptionHighlightDirective implements OnChanges, AfterViewInit {

    @Input('lndOptionHighlight')
    public term: string;

    private element: HTMLElement;
    private label: string;

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2,
    ) {
        this.element = this.elementRef.nativeElement;
    }

    ngOnChanges() {
        if (this._canHighlight) {
            this._highlightLabel();
        }
    }

    ngAfterViewInit() {
        this.label = decode(this.element.innerHTML);
        if (this._canHighlight) {
            this._highlightLabel();
        }
    }

    private _highlightLabel() {
        const label = this.label;
        if (!this.term) {
            this._setInnerHtml(label);
            return;
        }

        const indexOfTerm = searchHelper.stripSpecialChars(label)
            .toLowerCase()
            .indexOf(searchHelper.stripSpecialChars(this.term).toLowerCase());
        if (indexOfTerm > -1) {
            this._setInnerHtml(
                label.substring(0, indexOfTerm)
                + `<span class="highlighted">${label.substr(indexOfTerm, this.term.length)}</span>`
                + label.substring(indexOfTerm + this.term.length, label.length));
        } else {
            this._setInnerHtml(label);
        }
    }

    private get _canHighlight() {
        return this._isDefined(this.term) && this._isDefined(this.label);
    }

    private _setInnerHtml(html) {
        this.renderer.setProperty(this.elementRef.nativeElement, 'innerHTML', html);
    }

    private _isDefined(value: any) {
        return value !== undefined && value !== null;
    }
}
