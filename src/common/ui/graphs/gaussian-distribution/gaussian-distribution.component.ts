import {
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';

import * as d3 from 'd3';
import * as R from 'ramda';

import { AbstractGraphComponent } from 'src/common/ui/graphs/abstract.graph.component';
import { GAUSSIAN_CONSTS } from 'src/common/ui/graphs/gaussian-distribution/gaussian-distribution.config';
import { IDataGaussianDistribution } from 'src/common/ui/graphs/gaussian-distribution/models/gaussian-distribution.models';
import { operateNestedProperty } from 'src/common/utils';

@Component({
    selector: 'lnd-gaussian-distribution',
    templateUrl: './gaussian-distribution.component.html',
    styleUrls: ['./gaussian-distribution.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class GaussianDistributionComponent extends AbstractGraphComponent implements OnInit {

    @ViewChild('svgWrapper', { static: true })
    public svgWrapper: ElementRef;

    @Input()
    public active: IDataGaussianDistribution;

    @Input()
    public leftTittle = '';

    @Input()
    public rightTittle = '';

    @Input()
    public data: IDataGaussianDistribution[];

    public svg: any;

    constructor(
        private hostElement: ElementRef,
    ) {
        super();
    }

    protected clearContent(): void {
        this.svgWrapper.nativeElement.innerHTML = '';
    }

    protected initGraph(): void {
        const parentRect = this.hostElement.nativeElement.parentNode.getBoundingClientRect();
        this.width = parentRect.width - (this.margin.left + this.margin.right);
        const maxFreq = operateNestedProperty(['frequency'], R.reduce(R.max, -Infinity), this.data);
        const maxVal = operateNestedProperty(['value'], R.reduce(R.max, -Infinity), this.data);
        const minVal = operateNestedProperty(['value'], R.reduce(R.min, Infinity), this.data);
        const firstFreq = operateNestedProperty(['frequency'], R.head, this.data);
        const lastFreq = operateNestedProperty(['frequency'], R.last, this.data);

        this.svg = d3.select(this.svgWrapper.nativeElement)
            .append('svg')
                .attr('width', this.width + this.margin.left + this.margin.right)
                .attr('height', this.height + this.margin.top + this.margin.bottom)
                .append('g')
                .attr('transform',
                    'translate(' + this.margin.left + ',' + this.margin.top + ')');


            const x = d3.scaleLinear()
                .domain([
                    d3.min(this.data, (d: IDataGaussianDistribution) => d.value) - this.reservedValueInYAxis,
                    d3.max(this.data, (d: IDataGaussianDistribution) => d.value) + this.reservedValueInYAxis,
                ])
                .range([0, this.width]);


            const y = d3.scaleLinear()
                .domain([
                    0,
                    d3.max(this.data, (d: IDataGaussianDistribution) => d.frequency) + this.reservedValueInYAxis,
                ])
                .range([this.height, 0]);


        this.svg.append('polygon')
            .attr('class', 'graph graph-replenishment')
            .attr('points', `${x(minVal)},${this.height} ${x(maxVal)},${this.height} ${x(maxVal)},${y(lastFreq) - 0.5} ${x(minVal)},${y(firstFreq) - 0.5}`);

        this.svg.append('path')
            .attr('class', 'graph')
            .datum(this.data)
            .attr('d', d3.line()
                .curve(d3.curveCardinal)
                .x((d: any) => x(d.value))
                .y((d: any) => y(d.frequency)),
            );

        this.svg.append('text')
            .attr('class', 'text-start')
            .attr('x', x(minVal))
            .attr('y', this.height + GAUSSIAN_CONSTS.ADD_HEIGHT)
            .text(this.leftTittle);

        this.svg.append('text')
            .attr('class', 'text-end')
            .attr('x', x(maxVal))
            .attr('y', this.height + GAUSSIAN_CONSTS.ADD_HEIGHT)
            .text(this.rightTittle);


        this.svg.append('line')
            .attr('class', 'active-line')
            .attr('x1', x(this.active.value))
            .attr('y1', this.height)
            .attr('x2', x(this.active.value))
            .attr('y2', y(maxFreq));

        const textWrapper = this.svg.append('text')
            .attr('class', 'active-text')
            .attr('x', x(this.active.value))
            .attr('y', y(maxFreq));

        textWrapper.append('tspan')
            .attr('x', x(this.active.value) + GAUSSIAN_CONSTS.TEXT_MARGIN)
            .attr('dy', GAUSSIAN_CONSTS.TEXT_HEIGHT)
            .text(this.titleText);

        textWrapper.append('tspan')
            .attr('x', x(this.active.value) + GAUSSIAN_CONSTS.TEXT_MARGIN)
            .attr('dy', GAUSSIAN_CONSTS.TEXT_HEIGHT)
            .text(this.active.frequency);

    }
}
