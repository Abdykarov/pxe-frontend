import {
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as R from 'ramda';

// own models
import { IButtonType } from '../button/models/type.model';
import { ICardAlignment } from './models/alignment.model';
import { ICardData } from './models/data.model';
import { ICardType } from './models/type.model';
import {
    IImgPosition,
    IImgSize,
} from './models/img.model';

@Component({
    selector: 'lnd-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
})

export class CardComponent {
    @Output()
    public action?: EventEmitter<any> = new EventEmitter<any>();

    @Input()
    public alignment?: ICardAlignment;

    @Input()
    public buttonLabel?: string;

    @Input()
    public buttonType?: IButtonType;

    @Input()
    public hasButtonOutline = false;

    @Input()
    public data: ICardData;

    @Input()
    public hasButton = false;

    @Input()
    public imgPosition?: IImgPosition;

    @Input()
    public imgSize?: IImgSize;

    @Input()
    public type?: ICardType;

    constructor(public domSanitizer: DomSanitizer) {
        this.alignment = R.contains(this.alignment, Object.values(ICardAlignment)) ? this.alignment : ICardAlignment.LEFT;
        this.buttonType = R.contains(this.buttonType, Object.values(IButtonType)) ? this.buttonType : IButtonType.SECONDARY;
        this.type = R.contains(this.type, Object.values(ICardType)) ? this.type : ICardType.CARD;
        this.imgPosition = R.contains(this.imgPosition, Object.values(IImgPosition)) ? this.imgPosition : IImgPosition.TOP;
        this.imgSize = R.contains(this.imgSize, Object.values(IImgSize)) ? this.imgSize : null;
    }
}
