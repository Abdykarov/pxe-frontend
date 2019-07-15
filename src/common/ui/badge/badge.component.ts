import {
    Component,
    Input,
} from '@angular/core';

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

    constructor() {
        this.type = R.contains(this.type, Object.values(IBadgeType)) ? this.type : IBadgeType.INFO;
    }
}
