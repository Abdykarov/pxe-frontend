import {
    Component,
    Input,
} from '@angular/core';
import * as R from 'ramda';

import { IndicatorDirection } from './model/direction.model';
import { IndicatorPosition } from './model/position.model';
import { IndicatorBadge } from './model/badge.model';

@Component({
    selector: 'lnd-indicator',
    templateUrl: './indicator.component.html',
    styleUrls: ['./indicator.component.scss'],
})

export class IndicatorComponent {
    @Input()
    public direction: IndicatorDirection;

    @Input()
    public position: IndicatorPosition;

    @Input()
    public badge: IndicatorBadge;

    constructor() {
        this.position = R.contains(this.position, Object.values(IndicatorPosition)) ? this.position : IndicatorPosition.LEFT;
        this.badge = R.contains(this.badge, Object.values(IndicatorBadge)) ? this.badge : IndicatorBadge.NONE;
    }
}
