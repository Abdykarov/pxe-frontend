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

import { AbstractGraphComponent } from 'src/common/ui/graphs/abstract.graph.component';
import { IDataBarPlot } from 'src/common/ui/graphs/bar-plot/models/bar-plot.models';

@Component({
    selector: 'lnd-bar-plot',
    templateUrl: './bar-plot.component.html',
    styleUrls: ['./bar-plot.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class BarPlotComponent extends AbstractGraphComponent implements OnInit {


    constructor(
        private hostElement: ElementRef,
    ) {
        super();
    }

    @Input()
    public data: IDataBarPlot[] = [{
            label: 'Pondělí',
            value: 12,
        }, {
            label: 'Úterý',
            value: 6,
        }, {
            label: 'Středa',
            value: 20,
        }, {
            label: 'Čtvrtek',
            value: 30,
        }, {
            label: 'Pátek',
            value: 50,
        }, {
            label: 'Sobota',
            value: 5,
        }, {
            label: 'Neděle',
            value: 30,
        }];

    @ViewChild('svgWrapper', { static: true })
    public svgWrapper: ElementRef;

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
            .attr('transform',
                'translate(' + this.margin.left + ',' + this.margin.top + ')');

        const x = d3.scaleBand()
            .range([ 0, this.width ])
            .domain(this.data.map(function(d) { return d.label; }))
            .padding(0.05);

        const y = d3.scaleLinear()
            .domain([
                d3.min(this.data, (d: IDataBarPlot) => d.value) - this.reservedValueInXAxis,
                d3.max(this.data, (d: IDataBarPlot) => d.value) + this.reservedValueInXAxis,
            ])
            .range([ this.height, 0]);

            svg.append('g')
                .attr('transform', 'translate(0,' + this.height + ')')
                .attr('class', 'x axis')
                .call(d3.axisBottom(x).tickSize(0).tickPadding(10))
                .call(g => g.select('.domain').remove());

            function mousemove() {
                that.mouseMove.emit();
            }

            const u = svg.selectAll('rect')
                    .data(this.data);

                u
                    .enter()
                    .append('rect')
                    .merge(u)
                    .attr('x', function(d) { return x(d.label); })
                    .attr('y', function(d) { return y(d.value); })
                    .attr('width', x.bandwidth())
                    .attr('height', function(d) { return that.height - y(d.value); })
                    .attr('class', 'column')
                    .on('mousemove', () => that.mouseMove.emit())
                    .on('mouseout', () => this.mouseOut.emit());

            u
                .enter()
                .append('text')
                    .attr('x', function(d) { return x(d.label) + 15; })
                    .attr('y', function(d) { return that.height - 25; })
                    .attr('class', 'label')
                    .text(function(d) { return d.value; });
    }

}
