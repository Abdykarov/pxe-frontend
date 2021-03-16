import {
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

// own models
import { ICardData } from './models/data.model';

@Component({
    selector: 'lnd-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
})
export class CardComponent {

    @Input()
    public data: ICardData;

    @Output()
    public clickAction?: EventEmitter<any> = new EventEmitter<any>();

    constructor(public domSanitizer: DomSanitizer) {}
}
