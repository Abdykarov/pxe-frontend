import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { green } from 'color-name';

import * as d3 from 'd3';
import * as R from 'ramda';

import { AbstractGraphComponent } from 'src/common/ui/graphs/abstract.graph.component';
import { IDataBarPlot } from 'src/common/ui/graphs/bar-plot/models/bar-plot.models';

@Component({
    selector: 'lnd-progress-bar',
    templateUrl: './progress-bar.component.html',
    styleUrls: ['./progress-bar.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ProgressBarComponent extends AbstractGraphComponent implements OnInit {

    @ViewChild('svgWrapper', { static: true })
    public svgWrapper: ElementRef;

    @Input()
    public colorOfMainCirce = 'green';

    @Input()
    public colorOfProgressCirce = 'red';

    @Input()
    public percent = 30;

    public min: number;

    constructor(
        private hostElement: ElementRef,
    ) {
        super();
    }

    protected clearContent(): void {
        this.svgWrapper.nativeElement.innerHTML  = '';
    }

    protected initGraph(): void {
        const parentRect = this.hostElement.nativeElement.parentNode.getBoundingClientRect();
        this.width = parentRect.width - (this.margin.left + this.margin.right);
        this.min = Math.min(this.width, this.height);

        const that = this;

        const svg = d3.select(this.svgWrapper.nativeElement)
            .append('svg')
                .attr('width', this.min)
                .attr('height', this.min);

        const arcWidth = 12;
        const arcOuterRadius = this.min / 2;
        const arcInnerRadius = this.min / 2 - arcWidth;

        // const g = svg.append('g')
            // .attr('transform', `translate(${this.min / 2}, ${this.min / 2})`);

        const arcGenerator = d3.arc()
            .innerRadius(arcInnerRadius)
            .outerRadius(arcOuterRadius)
            .startAngle(0)
            .cornerRadius(5);


    }
}
