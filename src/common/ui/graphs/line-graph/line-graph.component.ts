import {
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';

import * as d3 from 'd3';

import { AbstractGraphComponent } from 'src/common/ui/graphs/abstract.graph.component';
import { LINE_CONSTS } from 'src/common/ui/graphs/line-graph/line-graph.config';
import { IDataLineGraph } from 'src/common/ui/graphs/line-graph/models/line-graph.models';

@Component({
    selector: 'lnd-line-graph',
    templateUrl: './line-graph.component.html',
    styleUrls: ['./line-graph.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LineGraphComponent extends AbstractGraphComponent implements OnInit {

    @ViewChild('svgWrapper', { static: true })
    public svgWrapper: ElementRef;

    @Input()
    public bisectDate = d3.bisector((d: IDataLineGraph) => d.date).left;

    @Input()
    public data: IDataLineGraph[];

    @Input()
    public dateFormatter = d3.timeFormat('%d. %m. %Y');

    @Input()
    public formatValue = d3.format(',');

    @Input()
    public locale = d3.timeFormatLocale({
        'dateTime': '%A,%e.%B %Y, %X',
        'date': '%-d. %-m. %Y',
        'time': '%H:%M:%S',
        'periods': ['AM', 'PM'],
        'days': ['neděle', 'pondělí', 'úterý', 'středa', 'čvrtek', 'pátek', 'sobota'],
        'shortDays': ['ne.', 'po.', 'út.', 'st.', 'čt.', 'pá.', 'so.'],
        'months': ['leden', 'únor', 'březen', 'duben',
            'květen', 'červen', 'červenec', 'srpen', 'září', 'říjen', 'listopad', 'prosinec'],
        'shortMonths': ['led', 'úno', 'břez', 'dub', 'kvě', 'čer', 'červ', 'srp', 'zář', 'říj', 'list', 'pros'],
    });

    @Input()
    public tooltipState: string;

    @Input()
    public unit: string;

    constructor(
        private hostElement: ElementRef,
    ) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
    }

    protected clearContent(): void {
        this.svgWrapper.nativeElement.innerHTML = '';
    }

    protected initGraph = () => {
        const parentRect = this.hostElement.nativeElement.parentNode.getBoundingClientRect();
        this.width = parentRect.width - (this.margin.left + this.margin.right);

        const that = this;
        const formatMillisecond = this.locale.format('.%L'),
            formatSecond = this.locale.format(':%S'),
            formatMinute = this.locale.format('%I:%M'),
            formatHour = this.locale.format('%I %p'),
            formatDay = this.locale.format('%a %d'),
            formatWeek = this.locale.format('%b %d'),
            formatMonth = this.locale.format('%B'),
            formatYear = this.locale.format('%Y');

        const multiFormat = (date) => {
            return (d3.timeSecond(date) < date ? formatMillisecond
                : d3.timeMinute(date) < date ? formatSecond
                    : d3.timeHour(date) < date ? formatMinute
                        : d3.timeDay(date) < date ? formatHour
                            : d3.timeMonth(date) < date ? (d3.timeWeek(date) < date ? formatDay : formatWeek)
                                : d3.timeYear(date) < date ? formatMonth
                                    : formatYear)(date);
        };

        const yScale = d3.scaleLinear()
            .domain([
                d3.min(this.data, (d: IDataLineGraph) => d.value) - this.reservedValueInYAxis,
                d3.max(this.data, (d: IDataLineGraph) => d.value) + this.reservedValueInYAxis,
            ])
            .range([this.height, 0]);

        const xScale = d3.scaleTime()
            .domain(d3.extent(this.data, (d: IDataLineGraph) => d.date))
            .range([ 0, this.width ]);

        const line = d3.line()
            .x((d: any) => xScale(d.date))
            .y((d: any) => yScale(d.value));

        const svg = d3.select(this.svgWrapper.nativeElement).append('svg')
            .attr('width', this.width + this.margin.left + this.margin.right)
            .attr('height', this.height + this.margin.top + this.margin.bottom)
            .append('g')
            .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(0, ${this.height})`)
            .call(
                d3.axisBottom(xScale)
                    .ticks(that.viewPortWidth < this.CONSTS.XL_RESOLUTION ? LINE_CONSTS.TICKS_TABLET : LINE_CONSTS.TICKS_DESkTOP)
                    .tickSize(0)
                    .tickPadding(LINE_CONSTS.PADDING)
                    .tickFormat(multiFormat),
            )
            .call(
                g => g.selectAll('.tick:not(:first-of-type) line').clone()
                    .attr('y2', -this.height)
                    .attr('stroke', '#ddd'),
            );

        svg.append('g')
            .attr('class', 'x axis')
            .call(d3.axisBottom(xScale).tickSize(0).tickPadding(0).tickFormat(<any>''));

        svg.append('g')
            .attr('class', 'y axis')
            .attr('transform', `translate(${this.width}, 0)`)
            .call(d3.axisRight(yScale).tickSize(0).tickPadding(0).tickFormat(<any>''));

        svg.append('g')
            .attr('class', 'y axis')
            .call(d3.axisLeft(yScale).tickSize(0).tickPadding(LINE_CONSTS.PADDING));

        svg.append('path')
            .datum(this.data)
            .attr('class', 'line')
            .attr('d', <any>line);

        if (this.titleText) {
            svg.append('text')
                .attr('x', (this.width / 2))
                .attr('y', LINE_CONSTS.TITLE_TEXT_MARGIN_BOTTOM)
                .attr('class', 'title')
                .text(this.titleText);
        }

        const focus = svg.append('g')
            .attr('class', 'focus')
            .style('display', 'none');

        focus.append('rect')
            .attr('class', 'tooltip')
            .attr('width', LINE_CONSTS.TOOLTIP_BACKGROUND_WIDTH)
            .attr('height', this.height)
            .attr('x', -(LINE_CONSTS.TOOLTIP_BACKGROUND_WIDTH / 2))
            .attr('y', 0);

        focus.append('rect')
            .attr('class', 'tooltip--rect')
            .attr('width', LINE_CONSTS.TOOLTIP_WIDTH)
            .attr('height', LINE_CONSTS.TOOLTIP_HEIGHT)
            .attr('x', -LINE_CONSTS.TOOLTIP_WIDTH / 2)
            .attr('rx', LINE_CONSTS.TOOLTIP_RADIUS)
            .attr('ry', LINE_CONSTS.TOOLTIP_RADIUS);

        focus.append('text')
            .attr('class', 'tooltip--state')
            .attr('width', LINE_CONSTS.TOOLTIP_WIDTH)
            .attr('height', LINE_CONSTS.TOOLTIP_LABEL_HEIGHT);

        focus.append('text')
            .attr('class', 'tooltip--value')
            .attr('width', LINE_CONSTS.TOOLTIP_WIDTH)
            .attr('height', LINE_CONSTS.TOOLTIP_LABEL_HEIGHT);

        focus.append('text')
            .attr('class', 'tooltip-unit')
            .attr('width', LINE_CONSTS.TOOLTIP_WIDTH)
            .attr('height', LINE_CONSTS.TOOLTIP_LABEL_HEIGHT);

        focus.append('polygon')
            .attr('class', 'tooltip--polygon')
            .attr('points', '-10,0 10,0 0,15');

        focus.append('path')
            .attr('class', 'tooltip--triangle')
            .attr('d', 'M-10,0 L0,15 L10,0');

        function mouseIn() {
            focus.style('display', null);
            that.mouseIn.emit(this);
        }

        function mouseOut() {
            focus.style('display', 'none');
            that.mouseOut.emit(this);
        }

        function mousemove() {
            const x0 = xScale.invert(d3.mouse(this)[0]);
            const i = that.bisectDate(that.data, x0, 1);
            const prevIndex = i - 2;
            const d1: IDataLineGraph = that.data[i - 1];
            const d0: IDataLineGraph = prevIndex < 0 ? d1 : that.data[prevIndex];
            const d: IDataLineGraph = <any>x0 - <any>(d0).date > <any>(d1).date - <any>x0 ? d1 : d0;
            focus.attr('transform', `translate(${xScale(d.date)}, 0)`);
            const coordinates = d3.mouse(this);
            const mouseY = coordinates[1];
            focus.select('.tooltip--state')
                .attr('transform', `translate(${LINE_CONSTS.TOOLTIP_MARGIN_LABELS}, ${(mouseY - LINE_CONSTS.TOOLTIP_LABEL_MARGIN_STATE)})`)
                .text(that.tooltipState + that.dateFormatter(d.date));

            focus.select('.tooltip--value')
                .attr('transform', `translate(${LINE_CONSTS.TOOLTIP_MARGIN_LABELS}, ${(mouseY - LINE_CONSTS.TOOLTIP_LABEL_MARGIN_VALUE)})`)
                .text(that.formatValue(d.value).replace('.', ','));

            focus.select('.tooltip-unit')
                .attr('transform', `translate(${LINE_CONSTS.TOOLTIP_MARGIN_LABELS}, ${(mouseY - LINE_CONSTS.TOOLTIP_LABEL_MARGIN_UNIT)})`)
                .text(that.unit);

            focus.select('.tooltip--rect').attr('transform', `translate(0,${(mouseY - LINE_CONSTS.TOOLTIP_Y_MARGIN)})`);
            focus.select('.tooltip--polygon').attr('transform', `translate(0, ${(mouseY + LINE_CONSTS.TRIANGLE_Y_MARGIN)})`);
            focus.select('.tooltip--triangle').attr('transform', `translate(0, ${(mouseY + LINE_CONSTS.TRIANGLE_Y_MARGIN)})`);
            that.mouseMove.emit({...d});
        }

        svg.append('rect')
            .attr('class', 'overlay')
            .attr('width', this.width)
            .attr('height', this.height)
            .on('mouseover', mouseIn)
            .on('mouseout', mouseOut)
            .on('mousemove', mousemove);

    }
}
