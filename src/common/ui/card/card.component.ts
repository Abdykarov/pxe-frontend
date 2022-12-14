import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as R from 'ramda';
// own models
import { ICardData } from './models/data.model';
import { ICardType } from './models/type.model';

@Component({
    selector: 'lnd-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
})
export class CardComponent {
    @Input()
    public data: ICardData;

    @Input()
    public type: ICardType;

    @Input()
    public linkUrl?: string[];

    constructor(public domSanitizer: DomSanitizer) {
        this.type = R.contains(this.type, Object.values(ICardType))
            ? this.type
            : null;
    }
}
