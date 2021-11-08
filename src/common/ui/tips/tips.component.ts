import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as R from 'ramda';
// own models
import { ITipsType } from './models/type.model';

@Component({
    selector: 'lnd-tips',
    templateUrl: './tips.component.html',
    styleUrls: ['./tips.component.scss'],
})
export class TipsComponent {
    @Input()
    public imgSrc?: string;

    @Input()
    public imgAlt?: string;

    @Input()
    public imgTitle?: string;

    @Input()
    public type?: ITipsType;

    constructor(public domSanitizer: DomSanitizer) {
        this.type = R.contains(this.type, Object.values(ITipsType))
            ? this.type
            : ITipsType.SMALL;
    }
}
