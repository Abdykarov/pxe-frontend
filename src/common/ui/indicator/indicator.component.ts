import {
    Component,
    Input,
    OnInit,
} from '@angular/core';

import * as R_ from 'ramda-extension';

@Component({
    selector: 'lnd-indicator',
    templateUrl: './indicator.component.html',
    styleUrls: ['./indicator.component.scss'],
})
export class IndicatorComponent implements OnInit {
    @Input()
    public value: number | string;

    public absValue: number;
    public isNegative: boolean;
    public neutralValue: string;

    ngOnInit() {
        if (R_.isNumber(this.value) && R_.isTruthy(this.value)) {
            this.isNegative = R_.isNegative(this.value);
            this.absValue = Math.abs(Number(this.value));
        } else {
            this.neutralValue = this.value.toString();
        }
    }
}
