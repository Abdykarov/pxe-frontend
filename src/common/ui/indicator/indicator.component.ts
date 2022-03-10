import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as R_ from 'ramda-extension';

@Component({
    selector: 'lnd-indicator',
    templateUrl: './indicator.component.html',
    styleUrls: ['./indicator.component.scss'],
})
export class IndicatorComponent implements OnChanges {
    @Input()
    public value: number | string;

    public absValue: number;
    public isNegative: boolean;
    public neutralValue: string;

    ngOnChanges(changes: SimpleChanges): void {
        if (R_.isNumber(this.value) && R_.isTruthy(this.value)) {
            this.isNegative = R_.isNegative(this.value);
            this.absValue = Math.abs(Number(this.value));
            this.neutralValue = undefined;
        } else {
            this.isNegative = undefined;
            this.absValue = undefined;
            this.neutralValue = this.value && this.value.toString();
        }
    }
}
