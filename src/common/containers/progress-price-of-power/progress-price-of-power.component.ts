import { Component } from '@angular/core';

import * as d3 from 'd3';
import * as R from 'ramda';

import { conf } from 'src/common/containers/progress-price-of-power/config';
import { countIndicator } from 'src/common/utils';
import {
    IDataLineGraph,
    IInputDataLineGraph,
} from 'src/common/ui/graphs/line-graph/models/line-graph.models';

@Component({
    selector: 'pxe-progress-price-of-power',
    templateUrl: './progress-price-of-power.component.html',
    styleUrls: ['./progress-price-of-power.component.scss'],
})
export class ProgressPriceOfPowerComponent {
    public readonly data: IDataLineGraph[];

    public currValue: number;
    public prevValue: number;

    public diff: number;

    constructor() {
        this.data = R.forEach(
            (val: IInputDataLineGraph) => val.date = <any>d3.timeParse('%Y-%m-%d')(val.date),
        )(conf);
    }

    public mouseIn = () => {
        this.prevValue = null;
        this.diff = 0;
    }

    public mouseOut = () => {
        this.prevValue = null;
        this.diff = 0;
    }

    public mouseMove = (newValue: IDataLineGraph) => {
        const currIndex = R.findIndex(
            (val: IDataLineGraph) => val.date.getTime() ===  newValue.date.getTime(),
        )(this.data);
        this.currValue = this.data[currIndex].value;
        this.prevValue = currIndex === 0 ? this.currValue : this.data[currIndex - 1].value;
        this.diff = countIndicator(this.currValue, this.prevValue);
    }
}
