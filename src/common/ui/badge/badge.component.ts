import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as R from 'ramda';
import { IBadgeType } from './models/type.model';

@Component({
    selector: 'pxe-badge',
    templateUrl: './badge.component.html',
    styleUrls: ['./badge.component.scss'],
})
export class BadgeComponent {
    @Input()
    public type: IBadgeType;

    @Input()
    public isLink = false;

    @Input()
    public hasBeak = false;

    @Output()
    public action: EventEmitter<any> = new EventEmitter<any>();

    constructor() {
        this.type = R.contains(this.type, Object.values(IBadgeType))
            ? this.type
            : IBadgeType.INFO;
    }

    public preventBubble = (event) => {
        event.preventDefault();
        event.cancelBubble = true;
    };
}
