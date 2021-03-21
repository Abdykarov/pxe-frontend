import {
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import * as R from 'ramda';
import { DomSanitizer } from '@angular/platform-browser';

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

    @Output()
    public clickAction?: EventEmitter<any> = new EventEmitter<any>();

    constructor(public domSanitizer: DomSanitizer) {
        this.type = R.contains(this.type, Object.values(ICardType)) ? this.type : null;
    }
}
