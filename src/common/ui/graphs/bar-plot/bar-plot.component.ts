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
import { BAR_PLOT_CONSTS } from 'src/common/ui/graphs/bar-plot/bar-plot.config';
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
    public limitForTransformLabel = BAR_PLOT_CONSTS.LIMIT_FOR_ROTATION_LABEL_TEXT;

    @Input('data')
    set setData(data: IDataBarPlot[]) {
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
        this.svgWrapper.nativeElement.innerHTML = '';
    }

    protected initGraph(): void {
        const parentRect = this.hostElement.nativeElement.parentNode.getBoundingClientRect();
        this.width = parentRect.width - (this.margin.left + this.margin.right);

        const svg = d3.select(this.svgWrapper.nativeElement)
            .append('svg')
            .attr('width', this.width + this.margin.left + this.margin.right)
            .attr('height', this.height + this.margin.top + this.margin.bottom)
            .append('g')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

        const mouseMove = (data, index, elemetns) => {
            const elementHovered = elemetns[index];
            const id = d3.select(elementHovered).attr('id');
            const reactRow = svg.select(`rect[id="${id}"]`);
            const reactRowY = parseInt(reactRow.attr('y'), 10);
            const textRow = svg.select(`text[id="${id}"]`);
            const textRowY = parseInt(textRow.attr('y'), 10);
            const isRectBellowText = reactRowY
                < (textRowY - (textRow.node() as SVGSVGElement).getBBox().height);
            if (isRectBellowText) {
                textRow.classed('hover', true);
            } else {
                textRow.attr('y', reactRowY - BAR_PLOT_CONSTS.AXIS_PADDING);
            }
            reactRow.classed('hover', true);
            this.mouseMove.emit(elementHovered);
        };

        const mouseOut = (data, index, elemetns) => {
            const elementHovered = elemetns[index];
            const id = d3.select(elementHovered).attr('id');
            const reactRow = svg.select(`rect[id="${id}"]`);
            const textRow = svg.select(`text[id="${id}"]`);
            reactRow.classed('hover', false);
            textRow.classed('hover', false);
            textRow.attr('y', this.height - BAR_PLOT_CONSTS.COL_MARGIN_BOTTOM);
            this.mouseOut.emit(elementHovered);
        };

        const x = d3.scaleBand()
            .range([ 0, this.width ])
            .domain(this.data.map((d: IDataBarPlot) => d.label))
            .padding(BAR_PLOT_CONSTS.PADDING_BETWEEN_ROWS);

        const y = d3.scaleLinear()
            .domain([
                d3.min(this.data, (d: IDataBarPlot) => d.value) - this.reservedValueInYAxis,
                d3.max(this.data, (d: IDataBarPlot) => d.value) + this.reservedValueInYAxis,
            ])
            .range([ this.height, 0]);

        const u = svg.selectAll('rect')
                .data(this.data);

        u
            .enter()
            .append('rect')
            .merge(<any>u)
            .attr('x', (d: IDataBarPlot) => x(d.label))
            .attr('y', (d: IDataBarPlot) => y(d.value))
            .attr('width', x.bandwidth())
            .attr('height', (d: IDataBarPlot) => this.height - y(d.value))
            .attr('class', 'column')
            .attr('id', (d: IDataBarPlot) => d.id)
            .on('mousemove', mouseMove)
            .on('mouseout', mouseOut);

        const widthOfColumn: number = parseInt(svg.select('.column').attr('width'), 10);
        const withoutTransformLabel = widthOfColumn > this.limitForTransformLabel;

        u
            .enter()
            .append('text')
            .attr('x', (d: IDataBarPlot) => x(d.label) + (withoutTransformLabel
                ? BAR_PLOT_CONSTS.ROTATION_LABEL_MARGIN : (widthOfColumn / 2)))
            .attr('y', this.height - BAR_PLOT_CONSTS.COL_MARGIN_BOTTOM)
            .attr('class', 'label')
            .attr('text-anchor', () => (!withoutTransformLabel ? 'middle' : ''))
            .attr('writing-mode', () => (!withoutTransformLabel ? 'tb' : ''))
            .attr('id', (d: IDataBarPlot) => d.id)
            .text((d: IDataBarPlot) => d.value)
            .on('mousemove', mouseMove)
            .on('mouseout', mouseOut);

        svg.append('g')
            .attr('transform', `translate(0,${(this.height + BAR_PLOT_CONSTS.AXIS_MARGIN_TOP)})`)
            .attr('class', 'x axis')
            .attr('writing-mode', () => (!withoutTransformLabel ? 'tb' : ''))
            .call(d3.axisBottom(x).tickSize(0).tickPadding(BAR_PLOT_CONSTS.AXIS_PADDING))
            .call(g => g.select('.domain').remove());
    }
}
