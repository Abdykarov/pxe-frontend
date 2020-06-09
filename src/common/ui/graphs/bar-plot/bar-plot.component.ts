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

import * as d3 from 'd3';
import * as R from 'ramda';

import { AbstractGraphComponent } from 'src/common/ui/graphs/abstract.graph.component';
import { IDataBarPlot } from 'src/common/ui/graphs/bar-plot/models/bar-plot.models';

@Component({
    selector: 'lnd-bar-plot',
    templateUrl: './bar-plot.component.html',
    styleUrls: ['./bar-plot.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class BarPlotComponent extends AbstractGraphComponent implements OnInit {

    @ViewChild('svgWrapper', { static: true })
    public svgWrapper: ElementRef;

    @Input()
    public limitForTransformLabel = 35;

    @Input('data') set allowDay(data: IDataBarPlot[]) {
        this._data = R.forEachObjIndexed((dataBarPlot: IDataBarPlot, id: number) => dataBarPlot.id = id)(data);
    }

    constructor(
        private hostElement: ElementRef,
    ) {
        super();
    }

     public _data: IDataBarPlot[];

    get data(): IDataBarPlot[] {
        return this._data;
    }

    protected clearContent(): void {
        this.svgWrapper.nativeElement.innerHTML  = '';
    }

    protected initGraph(): void {
        const parentRect = this.hostElement.nativeElement.parentNode.getBoundingClientRect();
        this.width = parentRect.width - (this.margin.left + this.margin.right);
        const that = this;

        const svg = d3.select(this.svgWrapper.nativeElement)
            .append('svg')
            .attr('width', this.width + this.margin.left + this.margin.right)
            .attr('height', this.height + this.margin.top + this.margin.bottom)
            .append('g')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

        const x = d3.scaleBand()
            .range([ 0, this.width ])
            .domain(this.data.map((d: IDataBarPlot) => d.label))
            .padding(0.05);

        const y = d3.scaleLinear()
            .domain([
                d3.min(this.data, (d: IDataBarPlot) => d.value) - this.reservedValueInXAxis,
                d3.max(this.data, (d: IDataBarPlot) => d.value) + this.reservedValueInXAxis,
            ])
            .range([ this.height, 0]);

        const u = svg.selectAll('rect')
                .data(this.data);

        u
            .enter()
            .append('rect')
            .merge(u)
            .attr('x', (d: IDataBarPlot) => x(d.label))
            .attr('y', (d: IDataBarPlot) => y(d.value))
            .attr('width', x.bandwidth())
            .attr('height', (d: IDataBarPlot) => this.height - y(d.value))
            .attr('class', 'column')
            .attr('id', (d: IDataBarPlot) => d.id)
            .on('mousemove', mouseMove)
            .on('mouseout', mouseOut);

        const widthOfColumn = svg.select('.column').attr('width');
        const withoutTransformLabel = widthOfColumn > this.limitForTransformLabel;

        u
            .enter()
            .append('text')
            .attr('x', (d: IDataBarPlot) => x(d.label) + (withoutTransformLabel ? 15 : (widthOfColumn / 2)))
            .attr('y', this.height - 25)
            .attr('class', 'label')
            .attr('text-anchor', () => (!withoutTransformLabel ? 'middle' : ''))
            .attr('writing-mode', () => (!withoutTransformLabel ? 'tb' : ''))
            .attr('id', (d: IDataBarPlot) => d.id)
            .text((d: IDataBarPlot) => d.value)
            .on('mousemove', mouseMove)
            .on('mouseout', mouseOut);

        svg.append('g')
            .attr('transform', `translate(0,${(this.height + 20)})`)
            .attr('class', 'x axis')
            .attr('writing-mode', () => (!withoutTransformLabel ? 'tb' : ''))
            .call(d3.axisBottom(x).tickSize(0).tickPadding(10))
            .call(g => g.select('.domain').remove());

        function mouseMove() {
            const elementHovered = this;
            const id = d3.select(elementHovered).attr('id');
            svg.selectAll(`[id="${id}"]`)
                .classed('hover', true);

            that.mouseMove.emit(elementHovered);
        }

        function mouseOut() {
            const elementHovered = this;
            const id = d3.select(elementHovered).attr('id');
            svg.selectAll(`[id="${id}"]`)
                .classed('hover', false);
            that.mouseOut.emit(elementHovered);
        }
    }
}
