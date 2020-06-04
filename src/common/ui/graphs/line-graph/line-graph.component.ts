import { Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import * as d3 from 'd3';
import { reduce } from 'rxjs/operators';
import * as R from 'ramda';

@Component({
    selector: 'lnd-line-graph',
    templateUrl: './line-graph.component.html',
    styleUrls: ['./line-graph.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LineGraphComponent implements OnInit {

    @ViewChild('canvasDiv', { static: true })
    public canvasDiv: ElementRef;

    @Input()
    public margin: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    } = {top: 50, right: 50, bottom: 50, left: 50};

    @Input()
    public width = 900;

    @Input()
    public height = 400;

    @Input()
    public title: string;

    constructor(
        private hostElement: ElementRef,
    ) {}

    ngOnInit() {
        this.initGraph();
    }



    private initGraph = () => {

        const parseTime = d3.timeParse('%Y');
        const bisectDate = d3.bisector(function(d) { return d.x; }).left;
        const x = d3.scaleTime().range([0, this.width]);
        const y = d3.scaleLinear().range([this.height, 0]);

        const parentRect = this.hostElement.nativeElement.parentNode.getBoundingClientRect();

// 8. An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
        const dataset = [
            {
                'x': '2020-04-01 00:00:00',
                'y': 23.84,
            },
            {
                'x': '2020-04-02 00:00:00',
                'y': 23.68,
            },
            {
                'x': '2020-04-03 00:00:00',
                'y': 22.83,
            },
            {
                'x': '2020-04-04 00:00:00',
                'y': 23.02,
            },
            {
                'x': '2020-04-05 00:00:00',
                'y': 10.93,
            },
            {
                'x': '2020-04-06 00:00:00',
                'y': 16.84,
            },
            {
                'x': '2020-04-07 00:00:00',
                'y': 24.23,
            },
            {
                'x': '2020-04-08 00:00:00',
                'y': 26.43,
            },
            {
                'x': '2020-04-09 00:00:00',
                'y': 25.81,
            },
            {
                'x': '2020-04-10 00:00:00',
                'y': 24.25,
            },
            {
                'x': '2020-04-11 00:00:00',
                'y': 23.39,
            },
            {
                'x': '2020-04-12 00:00:00',
                'y': 16.18,
            },
            {
                'x': '2020-04-13 00:00:00',
                'y': 0.58,
            },
            {
                'x': '2020-04-14 00:00:00',
                'y': 19.57,
            },
            {
                'x': '2020-04-15 00:00:00',
                'y': 23.85,
            },
            {
                'x': '2020-04-16 00:00:00',
                'y': 25.78,
            },
            {
                'x': '2020-04-17 00:00:00',
                'y': 26.78,
            },
            {
                'x': '2020-04-18 00:00:00',
                'y': 22.27,
            },
            {
                'x': '2020-04-19 00:00:00',
                'y': 13.2,
            },
            {
                'x': '2020-04-20 00:00:00',
                'y': 11.35,
            },
            {
                'x': '2020-04-21 00:00:00',
                'y': 8.98,
            },
            {
                'x': '2020-04-22 00:00:00',
                'y': 13.45,
            },
            {
                'x': '2020-04-23 00:00:00',
                'y': 27.42,
            },
            {
                'x': '2020-04-24 00:00:00',
                'y': 21.99,
            },
            {
                'x': '2020-04-25 00:00:00',
                'y': 21.11,
            },
            {
                'x': '2020-04-26 00:00:00',
                'y': 22.8,
            },
            {
                'x': '2020-04-27 00:00:00',
                'y': 28.34,
            },
            {
                'x': '2020-04-28 00:00:00',
                'y': 24.94,
            },
            {
                'x': '2020-04-29 00:00:00',
                'y': 22.22,
            },
            {
                'x': '2020-04-30 00:00:00',
                'y': 18.7,
            },
        ];

        dataset.forEach(function(d) {
            d.x = parseTime(d.x);
        });

        // 5. X scale will use the index of our data
        // const xScale = d3.scaleLinear()
        //     .domain([0, dataset.length - 1]) // input
        //     .range([0, this.width]); // output

        const xScale = d3.scaleTime()
            .domain(d3.extent(dataset, function(d) {
                    console.log(d);
                    return d.x;
                }),
            )
            .range([ 0, this.width ]);


// 6. Y scale will use the randomly generate number
        const yScale = d3.scaleLinear()
            .domain([
                d3.min(dataset, function(d) { return d.y; }) - 5,
                d3.max(dataset, function(d) { return d.y; }) + 5,
            ]) // input
            .range([this.height, 0]); // output

// 7. d3's line generator

        const line = d3.line()
            .x(function(d) { return x(d.x); })
            .y(function(d) { return y(d.y); });
        // .curve(d3.curveMonotoneX); // apply smoothing to the line


// 1. Add the SVG to the page and employ #2
        const svg = d3.select(this.canvasDiv.nativeElement).append('svg')
            .attr('width', this.width + this.margin.left + this.margin.right)
            .attr('height', this.height + this.margin.top + this.margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + this.height + ')')
            .call(d3.axisBottom(xScale).tickSize(0).tickPadding(20)); // Create an axis component with d3.axisBottom

        svg.append('g')
            .attr('class', 'x axis')
            .call(d3.axisBottom(xScale).tickSize(0).tickPadding(0).tickFormat('')); // Create an axis component with d3.axisBottom

        for (let i = 1 ; i < 5 ; i++) {
            svg.append('g')
                .attr('class', 'y axis')
                .attr('transform', 'translate(' + this.width / 5 * i + ',0)')
                .call(d3.axisRight(yScale).tickSize(0).tickPadding(0).tickFormat('')); // Create an axis component with d3.axisLeft
        }

        svg.append('g')
            .attr('class', 'y axis')
            .attr('transform', 'translate(' + this.width + ',0)')
            .call(d3.axisRight(yScale).tickSize(0).tickPadding(0).tickFormat('')); // Create an axis component with d3.axisLeft

        svg.append('g')
            .attr('class', 'y axis')
            .call(d3.axisLeft(yScale).tickSize(0).tickPadding(20)); // Create an axis component with d3.axisLeft



        // const focus = svg.append('g')
        //     .attr('class', 'focus')
        //     .style('display', 'none');
        //
        // focus.append('line')
        //     .attr('class', 'x-hover-line hover-line')
        //     .attr('y1', 0)
        //     .attr('y2', this.height);
        //
        // focus.append('line')
        //     .attr('class', 'y-hover-line hover-line')
        //     .attr('x1', this.width)
        //     .attr('x2', this.width);
        //
        // focus.append('circle')
        //     .attr('r', 7.5);
        //
        // focus.append('text')
        //     .attr('x', 15)
        //     .attr('dy', '.31em');
        //
// 9. Append the path, bind the data, and call the line generator
//         const that = this;
//         function mousemove() {
//             console.log('_AAAA_AA_A_A_');
//             const x0 = x.invert(d3.mouse(this)[0]),
//                 i = bisectDate(dataset, x0, 1),
//                 d0 = dataset[i - 1],
//                 d1 = dataset[i];
//             console.log('AHOJ');
//             console.log(x0);
//             console.log(i);
//             console.log('___');
            // focus.attr('transform', 'translate(' + x(d0.y) + ',' + y(d0.y) + ')');
            // focus.select('text').text(function() { return d.y; });
            // focus.select('.x-hover-line').attr('y2', that.height - y(d.y));
            // focus.select('.y-hover-line').attr('x2', that.width + that.width);
        // }

        svg.append('path')
            .datum(dataset)
            .attr('class', 'line')
            .attr('stroke', '#17a2b8')
            .attr('stroke-width', '1')
            .attr('d', line);
            // .on('mouseover', function() { focus.style('display', null); })
            // .on('mouseout', function() { focus.style('display', 'none'); })
            // .on('mousemove', mousemove);

        svg.append('text')
            .attr('x', (this.width / 2))
            .attr('y', 0 - (parentRect.top / 2))
            .attr('text-anchor', 'middle')
            .attr('class', 'h2--public')
            .text(this.title);






        // svg.selectAll('.dot')
        //     .data(dataset)
        //     .enter()
        //     .filter((d, i) => i % 2 === 0)
        //     .append('circle') // Uses the enter().append() method
        //     .attr('class', 'dot') // Assign a class for styling
        //     .attr('cx', function(d, i) { return xScale(i * 2); })
        //     .attr('cy', function(d) {
        //         return yScale(d.y); })
        //     .attr('r', 5)
        //     .on('mouseover', function(a, b, c) {
        //         d3.select(this).classed('class', 'focus');
        //     })
        //     .on('mouseout', function() {});

    }
}
