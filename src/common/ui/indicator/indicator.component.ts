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
    public value: number;

    public absValue: number;
    public isNegative: boolean;

    ngOnInit() {
        this.isNegative = R_.isNegative(this.value);
        this.absValue = Math.abs(this.value);
    }
}
